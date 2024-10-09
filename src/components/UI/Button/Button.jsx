import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import "./Button.css";

export const Button = React.memo(function Button({
  type = "button",
  text,
  className,
  isDisabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx("button", className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
});

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired, // Только допустимые значения
  text: PropTypes.string.isRequired, // Обязательный текст кнопки
  className: PropTypes.string, // Опциональный класс для стилей
  isDisabled: PropTypes.bool, // Опциональное состояние отключенной кнопки
  onClick: PropTypes.func, // Опциональная функция обработчик клика
};
