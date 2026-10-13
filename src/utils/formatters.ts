export function formatPrice(amount: number): string {
  // Format with thousand separators and Persian numbers
  const formatted = amount.toLocaleString('fa-IR');
  return `${formatted} تومان`;
}

export function toPersianDigits(n: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}
