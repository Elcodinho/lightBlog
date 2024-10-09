import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

export const Pagination = React.memo(function Pagination({
  postsPerPage,
  currentPage,
  setCurrentPage,
  searchResult,
}) {
  const totalPages = Math.ceil(searchResult / postsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>
  );
});

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired, // Количество постов на странице
  currentPage: PropTypes.number.isRequired, // Текущая страница
  setCurrentPage: PropTypes.func.isRequired, // Функция для установки текущей страницы
  searchResult: PropTypes.number.isRequired, // Общее количество постов для пагинации
};
