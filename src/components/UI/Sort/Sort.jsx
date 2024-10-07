import React from "react";
import "./Sort.css";

export const Sort = React.memo(function Sort({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
}) {
  // Устанвливаем значение для порядка сортирвки
  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }

  return (
    <section className="sort">
      <label className="search-label" htmlFor="search-input">
        Найти пост:
        <input
          className="search-item search-input"
          type="text"
          id="search-input"
          placeholder="Введите текст или автора"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <label className="sort-label" htmlFor="select-sort">
        Сортировать посты по дате
        <select
          className="sort-item sort-select"
          id="select-sort"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </label>
    </section>
  );
});
