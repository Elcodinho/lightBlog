import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPosts } from "@store/postSlice";
import { Sort } from "@components/Sort/Sort";
import { Posts } from "./Posts/Posts";
import { FetchError } from "@components/FetchError/FetchError";
import "./Home.css";

export function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new"); // State для управления порядком сортировки по дате
  const { status, error } = useSelector((state) => state.posts);

  // Получаем список постов
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <main>
      <section className="posts">
        <div className="container">
          <div className="posts__wrapper">
            {/* Рендер при loading */}
            {status === "loading" && <h2 className="loading">Loading...</h2>}
            {/* Рендер при Ошибке */}
            {error && (
              <FetchError error={error} text="Попробуйте позже" path="/" />
            )}
            {/* Рендер при успешной загрузке постов */}
            {status === "resolved" && (
              <>
                {posts.length > 0 ? (
                  <>
                    <Sort
                      search={search}
                      setSearch={setSearch}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                    />
                    <Posts search={search} sortOrder={sortOrder} />
                  </>
                ) : (
                  <FetchError
                    error="Список постов пуст"
                    text="Добавьте новый пост"
                    path="/newpost"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
