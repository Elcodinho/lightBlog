import { useState, useEffect } from "react";
import { Button } from "@components/Button/Button";
import { Confirmation } from "@components/Confirmation/Confirmation";
import "./Form.css";

export function Form({ title, setTitle, text, setText, handleSubmit }) {
  const [hide, setHide] = useState(true);

  return (
    <>
      <form className="new-post__form" onSubmit={(e) => e.preventDefault()}>
        <label className="new-page__label" htmlFor="new-title">
          Введите заголовок поста
        </label>
        <input
          className="new-page__title"
          type="text"
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
        btnText="Опубликовать"
        className="green"
        onConfirm={handleSubmit}
      />
    </>
  );
}
