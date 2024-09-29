import "./Sort.css";

export function Sort({ search, setSearch, sortOrder, setSortOrder }) {
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
          placeholder="Введите текст"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
        />
      </label>

      <label
        className="search-label"
        htmlFor="select-search"
        onChange={handleSortChange}
        value={sortOrder}
      >
        Сортировать посты по дате
        <select className="search-item search-select" id="select-search">
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </label>
    </section>
  );
}
