export const isBlank = (value: string | number | null | undefined) =>
  value === null || value === undefined || String(value).trim() === '';

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const fieldClass = (invalid?: boolean) => (invalid ? 'inputError' : undefined);

export const REQUIRED_FORM_MESSAGE = 'Completá los campos obligatorios.';
