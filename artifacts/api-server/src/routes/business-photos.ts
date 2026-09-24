import { randomUUID } from "node:crypto";
import { clerkClient, getAuth } from "@clerk/express";
import { Storage } from "@google-cloud/storage";
import { db, businessPhotosTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { Router, type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

const router = Router();
const sections = ["catering", "studio", "beauty", "supply"] as const;
const sectionSchema = z.enum(sections);
const objectPathSchema = z.string().regex(/^\/objects\/uploads\/[0-9a-f-]{36}$/);
const publishSchema = z.object({
  section: sectionSchema,
  smallPath: objectPathSchema,
  largePath: objectPathSchema,
  alt: z.string().trim().min(12).max(180),
  approved: z.literal(true),
});
const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: "http://127.0.0.1:1106/token",
    type: "external_account",
    credential_source: {
      url: "http://127.0.0.1:1106/credential",
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

function objectFile(path: string) {
  if (!objectPathSchema.safeParse(path).success) throw new Error("Invalid object path");
  const dir = process.env.PRIVATE_OBJECT_DIR;
  if (!dir) throw new Error("Object storage is not configured");
  const [bucket, ...prefix] = dir.replace(/^\/|\/$/g, "").split("/");
  if (!bucket) throw new Error("Object storage bucket is missing");
  return storage.bucket(bucket).file([...prefix, path.slice("/objects/".length)].join("/"));
}

async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const configuredEmail = process.env.ALCA_ADMIN_EMAIL?.trim().toLowerCase();
  if (!configuredEmail) {
    res.status(503).json({ error: "Admin access is not configured yet." });
    return;
  }
  const auth = getAuth(req);
  if (!auth.userId) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  try {
    const user = await clerkClient.users.getUser(auth.userId);
    const email = user.emailAddresses.find((entry) => entry.id === user.primaryEmailAddressId);
    if (!email || email.emailAddress.toLowerCase() !== configuredEmail || email.verification?.status !== "verified") {
      res.status(403).json({ error: "This account does not have admin access." });
      return;
    }
    next();
  } catch (error) {
    req.log.error({ err: error }, "Could not verify admin account");
    res.status(503).json({ error: "Could not verify admin account." });
  }
}

function sameOrigin(req: Request, res: Response, next: NextFunction) {
  const origin = req.get("origin");
  const host = req.get("x-forwarded-host")?.split(",")[0]?.trim() || req.get("host");
  let originHost: string | undefined;
  try { originHost = origin ? new URL(origin).host : undefined; } catch { originHost = undefined; }
  if (!originHost || !host || originHost !== host) {
    res.status(403).json({ error: "Request origin not allowed." });
    return;
  }
  next();
}

router.get("/business-photos", async (req, res) => {
  try {
    const rows = await db.select().from(businessPhotosTable);
    res.set("Cache-Control", "no-store").json(rows.map(({ section, alt, updatedAt }) => ({
      section, alt, version: updatedAt.getTime(),
    })));
  } catch (error) {
    req.log.error({ err: error }, "Could not load published photos");
    res.status(503).json({ error: "Photos temporarily unavailable." });
  }
});

router.get("/business-photos/:section/:size", async (req, res) => {
  const section = sectionSchema.safeParse(req.params.section);
  if (!section.success || !["small", "large"].includes(req.params.size as string)) {
    res.sendStatus(404);
    return;
  }
  try {
    const [photo] = await db.select().from(businessPhotosTable).where(eq(businessPhotosTable.section, section.data));
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    const file = objectFile(req.params.size === "small" ? photo.smallPath : photo.largePath);
    res.set({
      "Content-Type": "image/webp",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=300",
    });
    const stream = file.createReadStream();
    stream.on("error", (error) => {
      req.log.error({ err: error }, "Could not stream photo");
      if (!res.headersSent) res.sendStatus(503);
      else res.destroy(error);
    });
    stream.pipe(res);
  } catch (error) {
    req.log.error({ err: error }, "Could not serve photo");
    res.sendStatus(503);
  }
});

router.get("/admin/business-photos", requireAdmin, async (req, res) => {
  try {
    res.json(await db.select().from(businessPhotosTable));
  } catch (error) {
    req.log.error({ err: error }, "Could not list admin photos");
    res.status(503).json({ error: "Could not list photos." });
  }
});

router.post("/admin/business-photos/upload-url", sameOrigin, requireAdmin, async (req, res) => {
  const parsed = z.object({ contentType: z.literal("image/webp"), size: z.number().int().positive().max(4_000_000) }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Upload must be a WebP image under 4 MB." });
    return;
  }
  try {
    const objectPath = `/objects/uploads/${randomUUID()}`;
    const dir = process.env.PRIVATE_OBJECT_DIR;
    if (!dir) throw new Error("Object storage is not configured");
    const [bucketName, ...prefix] = dir.replace(/^\/|\/$/g, "").split("/");
    const response = await fetch("http://127.0.0.1:1106/object-storage/signed-object-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucket_name: bucketName,
        object_name: [...prefix, objectPath.slice("/objects/".length)].join("/"),
        method: "PUT",
        expires_at: new Date(Date.now() + 15 * 60_000).toISOString(),
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`Signing failed: ${response.status}`);
    const { signed_url: uploadUrl } = await response.json() as { signed_url: string };
    res.json({ uploadUrl, objectPath });
  } catch (error) {
    req.log.error({ err: error }, "Could not generate upload URL");
    res.status(503).json({ error: "Could not prepare upload." });
  }
});

router.put("/admin/business-photos", sameOrigin, requireAdmin, async (req, res) => {
  const parsed = publishSchema.safeParse(req.body);
  if (!parsed.success || parsed.data.smallPath === parsed.data.largePath) {
    res.status(400).json({ error: "Provide two different images, alt text, and approval confirmation." });
    return;
  }
  try {
    for (const path of [parsed.data.smallPath, parsed.data.largePath]) {
      const [metadata] = await objectFile(path).getMetadata();
      if (metadata.contentType !== "image/webp" || Number(metadata.size) > 4_000_000 || Number(metadata.size) < 100) {
        res.status(400).json({ error: "Invalid uploaded image." });
        return;
      }
    }
    const { section, smallPath, largePath, alt } = parsed.data;
    const [photo] = await db.insert(businessPhotosTable).values({ section, smallPath, largePath, alt })
      .onConflictDoUpdate({ target: businessPhotosTable.section, set: { smallPath, largePath, alt, updatedAt: new Date() } })
      .returning();
    res.json(photo);
  } catch (error) {
    req.log.error({ err: error }, "Could not publish photo");
    res.status(503).json({ error: "Could not publish photo." });
  }
});

router.delete("/admin/business-photos/:section", sameOrigin, requireAdmin, async (req, res) => {
  const section = sectionSchema.safeParse(req.params.section);
  if (!section.success) {
    res.sendStatus(404);
    return;
  }
  try {
    await db.delete(businessPhotosTable).where(eq(businessPhotosTable.section, section.data));
    res.sendStatus(204);
  } catch (error) {
    req.log.error({ err: error }, "Could not unpublish photo");
    res.status(503).json({ error: "Could not unpublish photo." });
  }
});

export default router;