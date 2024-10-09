import { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "../Button/Button";
import { BtnContext } from "@MyContext/BtnContext";
import "./Confirmation.css";

export function Confirmation({ hide, setHide, className = "", onConfirm }) {
  const { confirmTitle, confirmBtn } = useContext(BtnContext); // Заловок и текст кнопки для модалки подтверждения действия
  return (
    <div className={clsx("mask", { hidden: hide })}>
      <div className="modal">
        <div
          className="modal__close"
          role="button"
          onClick={() => setHide(true)}
        >
          &times;
        </div>
        <div className="modal__wrapper">
          {/* Заголовок модалки подтверждения */}
          <h4 className="modal__title">{confirmTitle}</h4>
          <p className="modal__text">Подвердите действие</p>
          <div className="modal__buttons">
            <Button
              type="button"
              text="Отмена"
              className="cancel"
              onClick={() => setHide(true)}
            />
            <Button
              type="button"
              text={confirmBtn} // Текст кнопки внутри модалки подверждения, передается из родительских компонентов
              className={className}
              onClick={() => onConfirm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Confirmation.propTypes = {
  hide: PropTypes.bool.isRequired, // Состояние скрытия модалки
  setHide: PropTypes.func.isRequired, // Функция для изменения состояния hide
  className: PropTypes.string, // Опциональный класс для стилизации кнопки
  onConfirm: PropTypes.func.isRequired, // Функция для обработки подтверждения действия
};
