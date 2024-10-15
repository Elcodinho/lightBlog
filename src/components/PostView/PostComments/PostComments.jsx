import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  addComment,
  deleteComment,
  editComment,
} from "@store/commentsSlice";
import { userSelect } from "@store/userSlice";
import { checkIfEditable } from "@utils/checkEditable";
import { CommentForm } from "@components/Forms/CommentForm/CommentForm";
import { FetchError } from "@components/FetchError/FetchError";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./PostComments.css";

export function PostComments({ id }) {
  const [text, setText] = useState("");
  const [fetchError, setFetchError] = useState(null); // Состояние ошибки при отправке запросе о добавлении нового комментария
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки нового комментария
  const [isEditing, setIsEditing] = useState(false); // Состояние редактирования поста
  const [editingComment, setEditingComment] = useState(null); // Состояние для управления редактируемым комментарием

  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const user = useSelector(userSelect); // Мы не выполняем проверку на налчии user, так как компонент будет показан только если user есть

  // Функция добавления комментария
  async function handleSubmit(e) {
    e.preventDefault();
    const time = format(new Date(), "d MMMM yyyy, HH:mm", {
      locale: ru,
    });
    const author = user.email;
    setIsLoading(true); // Устанавливаем состояние загрузки
    try {
      const action = await dispatch(
        addComment({
          id, //id тут это id поста(а не комментария)
          time,
          author,
          text: text.trim(),
        })
      );
      if (addComment.fulfilled.match(action)) {
        setText("");
        setFetchError(null);
      } else {
        // Обработка ошибки, если добавление не удалось
        setFetchError(action.payload);
      }
    } catch (error) {
      // Обработка ошибки, если добавление не удалось
      setFetchError("Произошла ошибка");
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки
    }
  }

  // Функция удаления комментария
  async function handleDelete(id) {
    try {
      const action = await dispatch(deleteComment(id));
      if (deleteComment.fulfilled.match(action)) {
        setFetchError(null);
      } else {
        // Обработка ошибки, если добавление не удалось
        setFetchError(action.payload);
      }
    } catch (error) {
      // Обработка ошибки, если добавление не удалось
      setFetchError("Произошла ошибка");
    }
  }

  // Функция редактирования комменатрия
  async function editSubmit(e, id) {
    e.preventDefault();
    try {
      const action = await dispatch(editComment({ id, text: text.trim() }));
      if (editComment.fulfilled.match(action)) {
        setText("");
        setIsEditing(false);
        setEditingComment(null); // Сбросить состояние редактирования
      } else {
        setFetchError(action.payload);
      }
    } catch (error) {
      setFetchError("Произошла ошибка");
    }
  }

  // Функция рендрит форму для редактирования поста
  function handleEdit(id) {
    setIsEditing(true);
    const comment = comments.find((item) => item.id === id);
    setText(comment.text);
    setEditingComment(id);
  }

  return (
    <>
      {fetchError && (
        <FetchError
          error={fetchError}
          text="Вернуться на главную страницу"
          path="/"
        />
      )}
      {!fetchError && (
        <section className="comments">
          <div className="comments__wrapper">
            <h3 className="comments__title">Комментарии</h3>
            {comments.length === 0 && (
              <p className="comments__subtitle">
                Оставьте первый комментарий к этой записи
              </p>
            )}
            {comments.length > 0 && (
              <ul className="comments__list">
                {comments.map((item) => (
                  <li key={item.id} className="comments__item">
                    <p className="comments__author">{item.author}</p>
                    <time className="comments__time">{item.time}</time>
                    <p className="comments__text">{item.text}</p>
                    {/* Удалить комментарий может только его автор или админ */}
                    {(user.email === item.author ||
                      user.email === "admin@mail.com") && (
                      <div className="comments-btn__block">
                        <button
                          className="comment__btn"
                          type="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash className="comment__btn__icon remove-icon" />
                        </button>
                        {item.id !== editingComment &&
                          checkIfEditable(item.time, 2) && (
                            <button
                              className="comment__btn"
                              type="button"
                              onClick={() => handleEdit(item.id)}
                            >
                              <FaEdit className="comment__btn__icon edit-icon" />
                            </button>
                          )}
                      </div>
                    )}
                    {isEditing && item.id === editingComment && (
                      <CommentForm
                        handleSubmit={(e) => editSubmit(e, item.id)}
                        text={text}
                        setText={setText}
                        isLoading={isLoading}
                        label="Редактировать комментарий"
                        btnText="Изменить"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {/* Форма для нового комментария рендриться, если никакой пост не редактируется */}
            {!isEditing && (
              <CommentForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                isLoading={isLoading}
                label="Добавьте комментарий"
                btnText="Отправить комментарий"
              />
            )}
          </div>
        </section>
      )}
    </>
  );
}

PostComments.propTypes = {
  id: PropTypes.string.isRequired, // id поста должен быть строкой и обязательным
};
