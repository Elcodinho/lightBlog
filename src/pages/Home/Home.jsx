import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPosts } from "@store/postSlice";
import { Posts } from "./Posts/Posts";
import { FetchError } from "@components/FetchError/FetchError";
import "./Home.css";

export function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const [postsLength, setPostsLength] = useState(null);
  const { status, error } = useSelector((state) => state.posts);

  // Получаем список постов
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts) {
      setPostsLength(posts.length);
    }
  }, [posts]);

  return (
    <main>
      <section className="posts">
        <div className="container">
          <div className="posts__wrapper">
            {status === "loading" && <h2 className="loading">Loading...</h2>}
            {error && (
              <FetchError error={error} text="Попробуйте позже" path="/" />
            )}
            {status === "resolved" && <Posts />}
            {postsLength === 0 && status === "resolved" && (
              <FetchError
                error="Список постов пуст"
                text="Добавьте новый пост"
                path="/newpost"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
