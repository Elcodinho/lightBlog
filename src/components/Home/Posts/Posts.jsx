import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectPosts } from "@store/postSlice";
import { Post } from "./Post/Post";
import "./Posts.css";

export function Posts({
  search,
  sortOrder,
  currentPage,
  postsPerPage,
  searchResult,
  setSearchResult,
}) {
  const posts = useSelector(selectPosts);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Используем debounce чтобы снизить нагрузку при поиске поста
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    // Очистка таймера при размонтировании или изменении значения
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Фильтруем посты и оставляем только те, что содержат строку из инпута search.
  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.body.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.author.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (sortOrder === "new") {
      setSearchResult(filteredPosts.reverse());
    } else {
      setSearchResult(filteredPosts);
    }
  }, [posts, debouncedSearch, sortOrder, setSearchResult]); // Важно использовать зависимость от sortOrder, чтобы сортировка по дате была динамической

  // Рассчитываем индексы постов для текущей страницы
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResult.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="posts__list">
      {currentPosts.map((item) => (
        <Post
          key={item.id}
          id={item.id}
          title={item.title}
          dateTime={item.datetime}
          body={item.body}
          author={item.author}
          isEdit={item.isEdit}
          searchQuery={debouncedSearch}
        />
      ))}
    </ul>
  );
}

Posts.propTypes = {
  search: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(["new", "old"]).isRequired,
  currentPage: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      datetime: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isEdit: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setSearchResult: PropTypes.func.isRequired,
};
