export function waLink(phone: string, text: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  // Prefix with 91 if it's a 10 digit Indian number
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(phone: string, text: string) {
  window.open(waLink(phone, text), "_blank", "noopener,noreferrer");
}
