import { Link } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="logo-block">
            <Link to="/" className="logo__link">
              LightBlog
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
