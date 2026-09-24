import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const businessPhotosTable = pgTable("alca_business_photos", {
  section: text("section").primaryKey(),
  smallPath: text("small_path").notNull(),
  largePath: text("large_path").notNull(),
  alt: text("alt").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBusinessPhotoSchema = createInsertSchema(businessPhotosTable).omit({ updatedAt: true });
export type InsertBusinessPhoto = z.infer<typeof insertBusinessPhotoSchema>;
export type BusinessPhoto = typeof businessPhotosTable.$inferSelect;