import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectPosts, deletePost } from "@store/postSlice";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import "./PostArticle.css";

export function PostArticle({ id, setDeleteError }) {
  const [hide, setHide] = useState(true);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === id);

  function handleDelete() {
    dispatch(deletePost({ id })).then((action) => {
      if (deletePost.fulfilled.match(action)) {
        // Если добавление поста успешно, перенаправляем на главную
        setDeleteError(null);
        navigate("/");
      } else {
        // Обработка ошибки, если добавление не удалось
        setDeleteError(action.payload);
      }
      setHide(true);
    });
  }

  return (
    <>
      <article className="post-page__article">
        <h2 className="post-page__title">{post.title}</h2>
        <time className="post-page__time">
          {post.isEdit && <span className="edit-mark">Ред:</span>}
          {post.datetime}
        </time>
        <p className="post-page__text">{post.body}</p>
        <div className="post-page__buttons">
          <Button
            type="button"
            text="Редактировать пост"
            className="green"
            onClick={() => navigate(`/posts/${id}/edit`)} // Редирект на страницу EditPost для редактирования
          />
          <Button
            type="button"
            text="Удалить пост"
            className="red"
            onClick={() => setHide(false)}
          />
        </div>
      </article>
      <Confirmation
        hide={hide}
        setHide={setHide}
        title="Удалить пост?"
        btnText="Удалить"
        className="red"
        onConfirm={handleDelete}
      />
    </>
  );
}
