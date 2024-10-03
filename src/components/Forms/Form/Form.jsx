import { useState, useEffect } from "react";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import "./Form.css";

export function Form({
  title, // Заголовок поста
  setTitle,
  text, // Текст поста
  setText,
  btnText, // Текст кнопки ВНУТРИ САМОЙ ФОРМЫ
  handleSubmit, // Функция для отправки формы
}) {
  const [hide, setHide] = useState(true); // Состоние для показа Confirmation (изначально скрыт)
  const [isDisabled, setIsDisabled] = useState(true); // Состояние управления кнопкой (disabled)

  function onFormSubmit(e) {
    e.preventDefault(); // Остановка стандартного поведения
  }

  // Управляем состоянием(disable) кнопки взавсимости от текстовых полей формы
  useEffect(() => {
    if (title.trim() !== "" && text.trim() !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, text]);

  return (
    <>
      <form className="new-post__form" onSubmit={onFormSubmit}>
        <label className="new-page__label" htmlFor="new-title">
          Введите заголовок поста
        </label>
        <input
          className="new-page__title"
          type="text"
          aria-label="Заголовок поста"
          name="new-title"
          id="new-title"
          maxLength="60"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="input-helper">Максимум 60 символов</p>
        <label className="new-page__label" htmlFor="new-text">
          Введите текст поста
        </label>
        <textarea
          className="new-page__text"
          type="text"
          aria-label="Текст поста"
          name="new-text"
          id="new-text"
          maxLength="4000"
          placeholder="Текст поста"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="input-helper">Максимум 4000 символов</p>
        <div className="btn-container">
          <Button
            type="submit" // Тип кнопки
            text={btnText} // Текст кнопки
            className="green"
            isDisabled={isDisabled}
            onClick={() => setHide(false)} // Показываем окно подтверждения действия
          />
        </div>
      </form>
      {!hide && (
        <Confirmation
          hide={hide}
          setHide={setHide}
          className="green"
          onConfirm={handleSubmit}
        />
      )}
    </>
  );
}
