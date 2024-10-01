import { Link } from "react-router-dom";
import "./Post.css";

export function Post({ id, title, dateTime, body, isEdit }) {
  return (
    <li className="post__item">
      <Link to={`/posts/${id}`} className="post__link">
        <article className="post__article">
          <h2 className="post__title">{title}</h2>
          <time className="post__time">
            {isEdit && <span className="edit-mark">Ред:</span>}
            {dateTime}
          </time>
          <p className="post__text">
            {body.length < 55 ? body : `${body.slice(0, 55)}...`}
          </p>
        </article>
      </Link>
    </li>
  );
}
