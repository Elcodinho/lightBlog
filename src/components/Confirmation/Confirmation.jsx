import clsx from "clsx";
import { Button } from "../Button/Button";
import "./Confirmation.css";

export function Confirmation({
  hide,
  setHide,
  title,
  btnText,
  className,
  onConfirm,
}) {
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
          <h4 className="modal__title">{title}</h4>
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
              text={btnText}
              className={className}
              onClick={() => onConfirm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
