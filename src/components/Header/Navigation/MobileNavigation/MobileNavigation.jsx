import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./MobileNavigation.css";

const navItems = [
  { name: "Главная", path: "/" },
  { name: "Новый пост", path: "/newpost" },
  { name: "О блоге", path: "/about" },
];

export function MobileNavigation({ setHide, user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состяние для управления показом мобильного меню

  // Функция показа мобильного меню
  function showMobileNav() {
    setIsMenuOpen(true);
  }

  // Функция скрытия мобильного меню
  function hideMobileNav() {
    setIsMenuOpen(false);
  }

  function handleClick() {
    hideMobileNav();
  }

  // Функция скрытия моб меню и вызова модалки подтверждения деавторизации
  function logOut() {
    hideMobileNav();
    setHide(false);
  }

  return (
    <>
      {/*Burger*/}
      <div
        className="header__toggle"
        id="menu-toggle"
        role="button"
        onClick={showMobileNav}
      >
        <span className="header__toggle-bar"></span>
        <span className="header__toggle-bar"></span>
        <span className="header__toggle-bar"></span>
      </div>

      {/*Mobile-nav*/}
      <nav
        className={clsx("mobile-nav", isMenuOpen && "active")}
        id="mobile-nav"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-controls="mobile-nav"
      >
        <ul className="mobile-nav__list">
          {navItems.map((item, index) => (
            <li key={index} className="mobile-nav__item">
              <NavLink to={item.path} onClick={handleClick}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {user && (
          <button className="logout-button--mobile" onClick={logOut}>
            Выйти
          </button>
        )}
        {!user && (
          <Link to="/login" className="login-button--mobile">
            Войти
          </Link>
        )}

        <button className="hide-mobile__button" onClick={handleClick}>
          Свернуть
        </button>
      </nav>
    </>
  );
}

MobileNavigation.propTypes = {
  setHide: PropTypes.func.isRequired, // setHide — функция и обязательно передается
  user: PropTypes.object, // user — объект, может быть необязательным (null)
};
