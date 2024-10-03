import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectPosts, deletePost } from "@store/postSlice";
import { userSelect } from "@store/userSlice";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import { BtnContext } from "@MyContext/BtnContext";
import "./PostArticle.css";

export function PostArticle({ id, setDeleteError }) {
  const [hide, setHide] = useState(true); // Состяние для управлением модалкой Confirmation
  const [isAuthor, setIsAuthor] = useState(false); // Состояние для проверки автора поста
  const [isAdmin, setIsAdmin] = useState(false); // Состояние для проверки администратора
  const posts = useSelector(selectPosts);
  const user = useSelector(userSelect);
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

  // Проверяем, является ли пользователем автора поста
  useEffect(() => {
    if (post && user) {
      //  Удалять пост может его автор и админ
      // Редактировать пост может только его автор
      if (post.author === user.email) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }

      if (user.email === "admin@mail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [post, user]);

  return (
    <>
      <article className="post-page__article">
        <h2 className="post-page__title">{post.title}</h2>
        <p className="post-page__author">Автор: {post.author}</p>
        <time className="post-page__time">
          {post.isEdit && <span className="edit-mark">Ред:</span>}
          {/* edit-mark общий стиль в папке styles */}
          {post.datetime}
        </time>
        <p className="post-page__text">{post.body}</p>

        {/* Компоненты, позволяющие изменять данные поста, рендрятся только для автора и админа этого поста */}
        {(isAuthor || isAdmin) && (
          <div className="post-page__buttons">
            {isAuthor && (
              <Button
                type="button"
                text="Редактировать пост"
                className="green"
                onClick={() => navigate(`/posts/${id}/edit`)} // Редирект на страницу EditPost для редактирования
              />
            )}
            <Button
              type="button"
              text="Удалить пост"
              className="red"
              onClick={() => setHide(false)}
            />
          </div>
        )}
      </article>
      {!hide && (
        <BtnContext.Provider
          value={{ confirmTitle: "Удалить пост?", confirmBtn: "Удалить" }}
        >
          <Confirmation
            hide={hide}
            setHide={setHide}
            className="red"
            onConfirm={handleDelete}
          />
        </BtnContext.Provider>
      )}
    </>
  );
}
