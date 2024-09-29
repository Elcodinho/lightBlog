import { NavLink } from "react-router-dom";
import clsx from "clsx";
import "./Navigation.css";

const navItems = [
  { name: "Главная", path: "/" },
  { name: "Новый пост", path: "/newpost" },
  { name: "О блоге", path: "/about" },
  { name: "Войти", path: "/register" },
];

export function Navigation() {
  const getLinkClass = ({ isActive }) =>
    `nav__link ${isActive ? "active" : ""}`;
  return (
    <nav>
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <li className="nav__item" key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(getLinkClass({ isActive }), {
                  "reg-link": index === navItems.length - 1,
                })
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
