import { NavLink } from "react-router-dom";
import "./Navigation.css";

const navItems = [
  { name: "Главная", path: "/" },
  { name: "Новый пост", path: "/newpost" },
  { name: "О блоге", path: "/about" },
];

export function Navigation() {
  const getLinkClass = ({ isActive }) =>
    `nav__link ${isActive ? "active" : ""}`;
  return (
    <nav className="nav" aria-label="Main Navigation">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <li className="nav__item" key={index}>
            <NavLink to={item.path} className={getLinkClass}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
