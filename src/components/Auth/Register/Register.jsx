import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setUser } from "@store/userSlice";
import { registerUser } from "@utils/registerUser";
import { AuthForm } from "@components/Forms/AuthForm/AuthForm";
import { Warning } from "@components/UI/Warning/Warning";
import "./Register.css";
import "@styles/fade.css";

export function Register() {
  const [email, setEmail] = useState(""); // состояние поля email
  const [password, setPassword] = useState(""); // состояние поля password
  const [isAnimating, setIsAnimating] = useState(false); // Состояние анимации
  const [fetchError, setFetchError] = useState(null); // состояние ошибки запроса
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const helperInfo = {
    btnText: "Создать аккаунт",
    text: "Уже есть аккаунт?",
    linkText: "Войти",
    link: "/login",
  };

  async function handleSubmit() {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const userData = await registerUser(email, password); // вызываем функцию регистрации
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

  return (
    <main className={clsx("fade", { "fade-out": isAnimating })}>
      <section className="register">
        <div className="container">
          {fetchError && <Warning />}
          <div className="register__wrapper">
            <h2 className="register__title">Регистрация</h2>
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              helperInfo={helperInfo}
              handleSubmit={handleSubmit}
              fetchError={fetchError}
              setFetchError={setFetchError}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
