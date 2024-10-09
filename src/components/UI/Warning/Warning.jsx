import { createPortal } from "react-dom";
import { IoMdInformationCircle } from "react-icons/io";
import "./Warning.css";

export function Warning({ warning }) {
  return createPortal(
    <div className="warning">
      <div className="warning__wrapper">
        <div>
          <IoMdInformationCircle className="info-circle" />
        </div>
        <p className="warning__text">{warning}</p>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
