const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const PHONE_CHARACTERS_PATTERN = /^[+\d().\s-]+$/;

export function validateEmail(value) {
  const email = value.trim();
  const [localPart] = email.split('@');

  return email.length <= 254
    && localPart?.length <= 64
    && !email.includes('..')
    && EMAIL_PATTERN.test(email);
}

export function normalizeUSPhone(value) {
  const trimmedPhone = value.trim();
  if (!PHONE_CHARACTERS_PATTERN.test(trimmedPhone)) return null;

  const digits = trimmedPhone.replace(/\D/g, '');
  const nationalNumber = digits.length === 11 && digits.startsWith('1')
    ? digits.slice(1)
    : digits;

  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(nationalNumber)) return null;

  const areaCode = nationalNumber.slice(0, 3);
  const exchange = nationalNumber.slice(3, 6);
  const lineNumber = nationalNumber.slice(6);

  return `+1 (${areaCode}) ${exchange}-${lineNumber}`;
}
