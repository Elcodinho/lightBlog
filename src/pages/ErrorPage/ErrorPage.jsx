import { Link } from "react-router-dom";
import "./ErrorPage.css";

export function ErrorPage() {
  return (
    <main>
      <h2 className="error-page__title">Ошибка: Страница не найдена</h2>
      <Link to="/" className="error-page__link">
        Вернуться на главную
      </Link>
    </main>
  );
}
