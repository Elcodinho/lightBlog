import { setUser } from "@store/userSlice";
import { loginUser } from "./loginUser";
// Функция для отправки формы при Login и Register

export async function authSubmit(
  email,
  password,
  dispatch,
  setIsAnimating,
  setEmail,
  setPassword,
  setFetchError,
  navigate
) {
  if (email.trim() !== "" && password.trim() !== "") {
    try {
      const userData = await loginUser(email, password); // вызываем функцию регистрации
      dispatch(setUser(userData)); // передаем данные пользователя в Redux
      // Начинаем анимацию
      setIsAnimating(true);
      localStorage.setItem("user", JSON.stringify(userData));

      setEmail("");
      setPassword("");
      setFetchError(null);

      // Переход на главную страницу после задержки анимации
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      // Предотвращаем случайный запуск анимации при ошибке
      setIsAnimating(false);
      setFetchError(error.message);
    }
  } else {
    alert("Заполните все поля");
  }
}
