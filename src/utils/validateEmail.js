// Функция вадидации email

export function validateEmail(email, setValidationError) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setValidationError("Введите корректный адрес электронной почты");
    return false;
  }
  setValidationError(null);
  return true;
}
