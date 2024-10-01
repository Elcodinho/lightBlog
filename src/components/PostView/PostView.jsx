import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "@store/postSlice";
import { PostArticle } from "./PostArticle/PostArticle";
import { FetchError } from "@components/FetchError/FetchError";
import "./PostView.css";

export function PostView() {
  const [deleteError, setDeleteError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]); // Подумать, возможно не стоит вызывать getPosts в разных компонентах

  return (
    <main>
      <section className="post-page">
        <div className="container">
          <div className="post-page__wrapper">
            {status === "loading" && <h2 className="loading">Loading...</h2>}
            {error && !deleteError && (
              <FetchError
                error={error}
                text="Вернуться на главную страницу"
                path="/"
              />
            )}
            {status === "resolved" && (
              <PostArticle id={id} setDeleteError={setDeleteError} />
            )}
            {deleteError && (
              <FetchError
                error={deleteError}
                text="Перезагрузите страницу"
                path={null}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
