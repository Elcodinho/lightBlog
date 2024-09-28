import { Link } from "react-router-dom";
import "./FetchError.css";

export function FetchError({ error, text, path }) {
  return (
    <div>
      <h2 className="fetch-error__title">{error}</h2>
      <Link to={path} className="fetch-error__link">
        {text}
      </Link>
    </div>
  );
}
