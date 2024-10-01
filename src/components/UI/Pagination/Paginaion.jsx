import React from "react";
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
