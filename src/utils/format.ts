// Маскирует номер в формат +7 (999) 999-99-99
export const maskPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '').replace(/^8/, '7');
  const match = digits.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  return match ? `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}` : phone;
};

// Приводит номер в формат 79999999999
export const unmaskPhoneNumber = (masked: string): string => {
  const digits = masked.replace(/\D/g, '');
  return digits.startsWith('8') ? '7' + digits.slice(1) : digits;
};
