import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import { useAuth } from "@hooks/useAuth";
import { Navigation } from "./Navigation/Navigation";
import { MobileNavigation } from "./Navigation/MobileNavigation/MobileNavigation";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import { BtnContext } from "@MyContext/BtnContext";
import "./Header.css";

export function Header() {
  const [hide, setHide] = useState(true); // Состяние для управления модалкой Confirmation
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuth();

  // Функция для проверки, активна ли ссылка
  const getLinkClass = (path) => {
    return `auth-control login-link ${
      location.pathname === path ? "active" : ""
    }`;
  };

  // Функция деавторизации
  function handleLogout() {
    // Удаляем данные о юзере и LocalStorage и Redux
    dispatch(removeUser());
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="logo-block">
            <Link to="/" className="logo__link">
              LightBlog
            </Link>
          </div>
          <div className="header-links__wrapper">
            <Navigation />
            {/* Только авторизованным пользователям */}
            {user && (
              <button
                className="auth-control logout-button"
                onClick={() => setHide(false)}
              >
                Выйти
              </button>
            )}
            {!user && (
              <Link to="/login" className={getLinkClass("/login")}>
                Войти
              </Link>
            )}
          </div>
          <MobileNavigation setHide={setHide} user={user} />
        </div>
      </div>
      {/* Рендер модалки, только если hide===false */}
      {!hide && (
        <BtnContext.Provider
          value={{ confirmTitle: "Вы хотите выйти?", confirmBtn: "Выйти" }}
        >
          <Confirmation
            hide={hide}
            setHide={setHide}
            className="green"
            onConfirm={handleLogout}
          />
        </BtnContext.Provider>
      )}
    </header>
  );
}
