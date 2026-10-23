// Worker ID format follows the Figma designs (e.g. PED-8492).
const WORKER_CODE = /^[A-Z]{3}-\d{4}$/;
const MOBILE = /^0\d{9}$/;

export const normalizeWorkerCode = (value) => (value ?? '').trim().toUpperCase();
export const normalizeMobile = (value) => (value ?? '').replace(/[\s-]/g, '');

export function validateWorkerCode(value) {
  const code = normalizeWorkerCode(value);
  if (!code) return 'Enter your Worker ID.';
  if (!WORKER_CODE.test(code)) return 'Worker ID must look like PED-0000.';
  return null;
}

export function validatePassword(value, minLength = 8) {
  if (!value) return 'Enter a password.';
  if (value.length < minLength) return `Password must be at least ${minLength} characters.`;
  return null;
}

export function validateRegistration(input, { minPasswordLength = 8 } = {}) {
  const errors = {};
  if (!(input.fullName ?? '').trim()) errors.fullName = 'Enter your full name.';
  const codeError = validateWorkerCode(input.workerCode);
  if (codeError) errors.workerCode = codeError;
  if (!MOBILE.test(normalizeMobile(input.mobile))) errors.mobile = 'Enter a 10-digit mobile number, e.g. 07X XXX XXXX.';
  if (!input.estateId || !input.divisionId) errors.assignment = 'Select your estate and division.';
  const passwordError = validatePassword(input.password, minPasswordLength);
  if (passwordError) errors.password = passwordError;
  else if (input.password !== input.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return { isValid: Object.keys(errors).length === 0, errors };
}
