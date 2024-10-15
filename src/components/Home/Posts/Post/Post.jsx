import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Post.css";

export function Post({
  id,
  title,
  dateTime,
  body,
  author,
  searchQuery, // Строка поиска
}) {
  // Функция для выделения совпадающего текста
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <li className="post__item">
      <Link to={`/posts/${id}`} className="post__link">
        <article className="post__article">
          <h2 className="post__title">{highlightText(title, searchQuery)}</h2>
          <p className="post__author">
            Автор: {highlightText(author, searchQuery)}
          </p>
          <time className="post__time">{dateTime}</time>
          <p className="post__text">
            {highlightText(
              body.length < 55 ? body : `${body.slice(0, 55)}...`,
              searchQuery
            )}
          </p>
        </article>
      </Link>
    </li>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
};
