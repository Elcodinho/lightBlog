// Функция валидации пароля
export function validatePassword(password, setValidationError) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    setValidationError(
      "Пароль должен быть не менее 6 символов, содержать заглавные и строчные буквы, а также хотя бы одну цифру"
    );
    return false;
  }
  setValidationError(null);
  return true;
}
