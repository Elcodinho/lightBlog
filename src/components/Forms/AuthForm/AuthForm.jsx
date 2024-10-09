import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@components/UI/Button/Button";
import "./AuthForm.css";

export function AuthForm({
  email,
  setEmail, // состояние поля email
  password,
  setPassword, // состояние поля password
  helperInfo, // Информаци для кнопки и о наличии аккаунта в форме
  handleSubmit, // Функция которая выполнится при отправке формы
  fetchError = null,
  setFetchError, // состояние ошибки при отправке формы

  emailError = null,
  setEmailError, // состоние ошибки ввода email
  passError = null,
  setPassError, // состоние ошибки ввода пароля
}) {
  const [showPassword, setShowPassword] = useState(false); // Состтяние для управления показом пароля

  // Функция переключает видимость пароля
  const PasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev); // Переключаем видимость пароля
  };

  function onAuthSubmit(e) {
    e.preventDefault(); // Остановка стандартного поведения
    handleSubmit(); // Вызов переданной функции обработки
  }

  // Функция переключения класса ошибки (При наличии fetchError класс ошибки добавиться и наоборот)
  function getCssClass(
    fetchError,
    emailError,
    passError,
    baseClass,
    errorClass
  ) {
    return clsx(baseClass, {
      [errorClass]: fetchError || emailError || passError,
    });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    // Если ошибка есть, то при вводе мы ее сбрасываем (это позволяет убрать все стили и уведомления об ошибках, как только пользователь начинает вводить исправления)
    if (fetchError) {
      setFetchError(null);
    }
    if (emailError) {
      setEmailError(null);
    }
    if (passError) {
      setPassError(null);
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    // Если ошибка есть, то при вводе мы ее сбрасываем (это позволяет убрать все стили и уведомления об ошибках, как только пользователь начинает вводить исправления)
    if (fetchError) {
      setFetchError(null);
    }
    if (passError) {
      setPassError(null);
    }
    if (emailError) {
      setEmailError(null);
    }
  }

  return (
    <form className="auth__form" onSubmit={onAuthSubmit}>
      <div className="form-group">
        <input
          // Добавляется или удаляется доп класс, взависмости от работы функции
          className={getCssClass(
            fetchError,
            emailError,
            passError,
            "auth__input",
            "auth__error--border"
          )}
          type="email"
          aria-label="электронная почта"
          placeholder=""
          required
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label
          htmlFor="email"
          // Добавляется или удаляется доп класс, взависмости от работы функции
          className={getCssClass(
            fetchError,
            emailError,
            passError,
            "auth__label",
            "auth__error--color"
          )}
        >
          Введите Email
        </label>
      </div>

      <div className="form-group">
        <input
          // Добавляется или удаляется доп класс, взависмости от работы функции
          className={getCssClass(
            fetchError,
            emailError,
            passError,
            "auth__input",
            "auth__error--border"
          )}
          type={showPassword ? "text" : "password"} // Меняем тип в зависимости от состояния
          aria-label="пароль"
          placeholder=""
          required
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label
          htmlFor="password"
          // Добавляется или удаляется доп класс, взависмости от работы функции
          className={getCssClass(
            fetchError,
            emailError,
            passError,
            "auth__label",
            "auth__error--color"
          )}
        >
          Введите пароль
        </label>
        {!showPassword && (
          <FaRegEye className="eye-icon" onClick={PasswordVisibilityToggle} />
        )}
        {showPassword && (
          <FaRegEyeSlash
            className="eye-icon"
            onClick={PasswordVisibilityToggle}
          />
        )}
      </div>

      <Button type="submit" text={helperInfo.btnText} className="green" />

      <div className="auth-helper">
        <p className="auth-helper__text">{helperInfo.text}</p>
        <Link to={helperInfo.link} className="auth-helper__link">
          {helperInfo.linkText}
        </Link>
      </div>
    </form>
  );
}

AuthForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  helperInfo: PropTypes.shape({
    btnText: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fetchError: PropTypes.string,
  setFetchError: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  setEmailError: PropTypes.func.isRequired,
  passError: PropTypes.string,
  setPassError: PropTypes.func.isRequired,
};
