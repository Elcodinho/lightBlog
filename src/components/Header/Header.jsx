import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import { useAuth } from "@hooks/useAuth";
import { Navigation } from "./Navigation/Navigation";
import "./Header.css";
import "@styles/fade.css";

export function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuth();

  // Функция для проверки, активна ли ссылка
  const getLinkClass = (path) => {
    return `login-link ${location.pathname === path ? "active" : ""}`;
  };

  function handleLogout() {
    // Удаляем данные о юзере и LocalStorage и Redux
    dispatch(removeUser());
    localStorage.removeItem("user");
    navigate("/");
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
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="logout-btn"
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
        </div>
      </div>
    </header>
  );
}
