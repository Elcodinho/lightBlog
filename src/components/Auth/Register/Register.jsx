import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "@store/userSlice";
import { registerUser } from "@utils/registerUser";
import { validateEmail } from "@utils/validateEmail";
import { validatePassword } from "@utils/validatePassword";
import { AuthForm } from "@components/Forms/AuthForm/AuthForm";
import { Warning } from "@components/UI/Warning/Warning";
import "./Register.css";

export function Register() {
  const [email, setEmail] = useState(""); // состояние поля email
  const [password, setPassword] = useState(""); // состояние поля password
  const [fetchError, setFetchError] = useState(null); // состояние ошибки запроса

  const [emailError, setEmailError] = useState(null); // состояние ошибки валидации email
  const [passError, setPassError] = useState(null); // состояние ошибки валидации пароля
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const helperInfo = {
    btnText: "Создать аккаунт",
    text: "Уже есть аккаунт?",
    linkText: "Войти",
    link: "/login",
  };

  async function handleSubmit() {
    if (
      !validateEmail(email, setEmailError) ||
      !validatePassword(password, setPassError)
    ) {
      return; // Останавливаем отправку формы, если пароль не прошел валидацию
    }
    try {
      const userData = await registerUser(email, password); // вызываем функцию регистрации
      dispatch(setUser(userData)); // передаем данные пользователя в Redux

      // Начинаем анимацию
      localStorage.setItem("user", JSON.stringify(userData));
      setEmail("");
      setPassword("");
      setFetchError(null);
      navigate("/");
    } catch (error) {
      setFetchError(error.message);
    }
  }

  return (
    <main>
      <section className="register">
        <div className="container">
          {fetchError && <Warning warning={fetchError} />}
          {emailError && <Warning warning={emailError} />}
          {passError && <Warning warning={passError} />}
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
              //
              emailError={emailError}
              setEmailError={setEmailError}
              passError={passError}
              setPassError={setPassError}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
