import PropTypes from "prop-types";
import "./CommentForm.css";

export function CommentForm({
  handleSubmit,
  text,
  setText,
  isLoading,
  label,
  btnText,
}) {
  return (
    <form className="comments__form" onSubmit={handleSubmit}>
      <label className="comments__label" htmlFor="comment">
        {label}
      </label>
      <textarea
        className="comments__input"
        type="text"
        name="comment"
        id="comment"
        required
        placeholder="Введите текст"
        maxLength={3000}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="input-helper">
        Максимум 3000 символов
        <span>{`${text.length}/3000`}</span>
      </p>
      <button
        className="comments__submit"
        type="submit"
        disabled={isLoading || !text.trim()} // Отключаем кнопку на время загрузки
      >
        {isLoading ? "Отправка..." : btnText}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // Обязательная функция
  text: PropTypes.string.isRequired, // Обязательная строка
  setText: PropTypes.func.isRequired, // Обязательная функция
  isLoading: PropTypes.bool.isRequired, // Обязательное булево значение
  label: PropTypes.string.isRequired, // Обязательная строка
  btnText: PropTypes.string.isRequired, // Обязательная строка
};
