export function rupees(value: number | string): string {
  const n =
    typeof value === "string" ? Number(value.replace(/[^\d.-]/g, "")) : value;
  return Number.isFinite(n) ? `₹${n.toLocaleString("en-IN")}` : "Ask price";
}

export function priceNumber(value: string): number {
  const n = Number(value.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
