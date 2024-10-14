import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "@store/postSlice";
import { getComments } from "@store/commentsSlice";
import { PostArticle } from "./PostArticle/PostArticle";
import { PostComments } from "./PostComments/PostComments";
import { FetchError } from "@components/FetchError/FetchError";
import "./PostView.css";

export function PostView() {
  const [deleteError, setDeleteError] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { status: postStatus, error: postError } = useSelector(
    (state) => state.posts
  );
  const { status: commentsStatus, error: commentsError } = useSelector(
    (state) => state.comments
  );

  // Функция получения постов
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]); // Подумать, возможно не стоит вызывать getPosts в разных компонентах

  // Функция получения комментариев для поста
  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  // Функция выполняет рендер комопнента FetchError
  const renderFetchError = (error, text, path) => (
    <FetchError error={error} text={text} path={path} />
  );

  return (
    <main>
      <section className="post-page">
        <div className="container">
          <div className="post-page__wrapper">
            {postStatus === "loading" && (
              <h2 className="loading">Loading...</h2>
            )}
            {postError &&
              !deleteError &&
              renderFetchError(postError, "Вернуться на главную страницу", "/")}

            {postStatus === "resolved" && (
              <>
                <PostArticle id={id} setDeleteError={setDeleteError} />
                {commentsStatus === "loading" && (
                  <h2 className="loading">Loading comments...</h2>
                )}
                {commentsStatus === "resolved" && <PostComments id={id} />}
              </>
            )}
            {deleteError &&
              renderFetchError(deleteError, "Перезагрузите страницу", null)}
            {commentsError &&
              renderFetchError(commentsError, "Перезагрузите страницу", null)}
          </div>
        </div>
      </section>
    </main>
  );
}
