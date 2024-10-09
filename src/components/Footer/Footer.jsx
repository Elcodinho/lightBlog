import { useSelector } from "react-redux";
import { userSelect } from "@store/userSlice";
import "./Footer.css";

export function Footer() {
  const userInfo = useSelector(userSelect);
  const user = userInfo.email || "Анонимный посетитель";
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">Пользователь: {user}</div>
      </div>
    </footer>
  );
}
