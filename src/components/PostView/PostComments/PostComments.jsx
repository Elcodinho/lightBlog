import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { selectComments, addComment } from "@store/commentsSlice";
import { userSelect } from "@store/userSlice";
import { Comment } from "./Comment/Comment";
import { CommentForm } from "@components/Forms/CommentForm/CommentForm";
import { FetchError } from "@components/FetchError/FetchError";

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
                  <Comment
                    key={item.id}
                    comment={{
                      id: item.id,
                      author: item.author,
                      time: item.time,
                      text: item.text,
                    }}
                    user={user}
                    editingState={{
                      isEditing: isEditing, // Состояние отображает редактируется комментарий или нет
                      editingComment: editingComment, // Id редактируемого комментария
                      formText: text, // Текст для формы редактирования
                      isLoading: isLoading, // Состояние загрузки
                    }}
                    actions={{
                      setIsEditing: setIsEditing,
                      setEditingComment: setEditingComment,
                      handleEdit: handleEdit, // Функция показывает форму для редактирования комментария
                      setText: setText,
                      setFetchError: setFetchError,
                    }}
                  />
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
