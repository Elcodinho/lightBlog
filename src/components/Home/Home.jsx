import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPosts } from "@store/postSlice";
import { Sort } from "@components/UI/Sort/Sort";
import { Posts } from "./Posts/Posts";
import { Pagination } from "@components/UI/Pagination/Paginaion";
import { FetchError } from "@components/FetchError/FetchError";
import "./Home.css";

export function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]); // Сюда попадают посты, которые соответсвуют результату поиска search
  const [sortOrder, setSortOrder] = useState("new"); // State для управления порядком сортировки по дате

  // Работа со страницами
  const [currentPage, setCurrentPage] = useState(1); // состояние для текущей страницы
  const postsPerPage = 5; // количество постов на странице

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
                    {/* Отображения блока фильтрации и сортировок только на первой странице */}
                    {currentPage === 1 && (
                      <Sort
                        search={search}
                        setSearch={setSearch}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                      />
                    )}

                    <Posts
                      search={search}
                      sortOrder={sortOrder}
                      currentPage={currentPage}
                      postsPerPage={postsPerPage}
                      searchResult={searchResult}
                      setSearchResult={setSearchResult}
                    />
                    {/* Рендринг пагинации только если отфильтрованный массив после поиска имеет минимум 1 элемент */}
                    {searchResult.length > 0 && (
                      <Pagination
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        searchResult={searchResult.length}
                      />
                    )}
                    {searchResult.length === 0 && (
                      <h2 style={{ marginTop: "40px", textAlign: "center" }}>
                        Ничего не найдено
                      </h2>
                    )}
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
