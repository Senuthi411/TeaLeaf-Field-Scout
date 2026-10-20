export const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (value) => /[a-z]/.test(value),
  },
  { id: "number", label: "One number", test: (value) => /[0-9]/.test(value) },
  {
    id: "special",
    label: "One special character",
    test: (value) => /[^A-Za-z0-9\s]/.test(value),
  },
];
export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  else if (passwordRules.some((rule) => !rule.test(password)))
    errors.password = "Your password must meet all five requirements below.";
  return errors;
}
