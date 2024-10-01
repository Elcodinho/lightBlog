import { IoMdInformationCircle } from "react-icons/io";
import "./Warning.css";

export function Warning() {
  return (
    <div className="warning">
      <div className="warning__wrapper">
        <div>
          <IoMdInformationCircle size={30} />
        </div>
        <p className="warning__text">
          Ошибка! Неверная почта или пароль. Проверьте правильность ввода.
        </p>
      </div>
    </div>
  );
}
