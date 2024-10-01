import { useState, useEffect } from "react";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import "./Form.css";

export function Form({ title, setTitle, text, setText, handleSubmit }) {
  const [hide, setHide] = useState(true); // Состоние для показа Confirmation (изначально скрыт)

  function onFormSubmit(e) {
    e.preventDefault(); // Остановка стандартного поведения
    handleSubmit(); // Вызов переданной функции обработки
  }
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
            type="submit"
            text="Добавить пост"
            className="green"
            onClick={() => setHide(false)}
          />
        </div>
      </form>
      <Confirmation
        hide={hide}
        setHide={setHide}
        title="Опубликовать пост?"
        className="green"
        onConfirm={handleSubmit}
      />
    </>
  );
}
