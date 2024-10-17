import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "@store/commentsSlice";
import { checkIfEditable } from "@utils/checkEditable";
import { CommentForm } from "@components/Forms/CommentForm/CommentForm";
import { Confirmation } from "@components/UI/Confirmation/Confirmation";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Comment.css";

export function Comment({ comment, user, editingState, actions }) {
  const { id, author, time, text } = comment;
  const { isEditing, editingComment, formText, isLoading } = editingState;
  const {
    setIsEditing,
    setEditingComment,
    handleEdit,
    setText,
    setFetchError,
  } = actions;
  const [hide, setHide] = useState(true); // Состоние для показа Confirmation (изначально скрыт)
  const [deleteId, setDeleteId] = useState(null); // Состояние для id удаляемого комментария
  const dispatch = useDispatch();

  // Функция редактирования комменатрия
  async function editSubmit(e, id) {
    e.preventDefault();
    try {
      const action = await dispatch(editComment({ id, text: formText.trim() }));
      if (editComment.fulfilled.match(action)) {
        setText("");
        setIsEditing(false);
        setEditingComment(null); // Сбросить состояние редактирования
      } else {
        setFetchError(action.payload);
      }
    } catch (error) {
      console.log("catch");
      setFetchError("Произошла ошибка");
    }
  }

  // Функция удаления комментария
  async function handleDelete() {
    try {
      const action = await dispatch(deleteComment(deleteId));
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

  return (
    <li className="comments__item">
      <p className="comments__author">{author}</p>
      <time className="comments__time">{time}</time>
      <p className="comments__text">{text}</p>
      {/* Удалить комментарий может только его автор или админ */}
      {(user.email === author || user.email === "admin@mail.com") && (
        <div className="comments-btn__block">
          <button
            className="comment__btn"
            type="button"
            // onClick={() => handleDelete(id)}
            onClick={() => {
              setHide(false);
              setDeleteId(id);
            }}
          >
            <FaTrash className="comment__btn__icon remove-icon" />
          </button>

          {user.email === author &&
            id !== editingComment &&
            checkIfEditable(time, 2) && (
              <button
                className="comment__btn"
                type="button"
                onClick={() => handleEdit(id)}
              >
                <FaEdit className="comment__btn__icon edit-icon" />
              </button>
            )}

          {isEditing && id === editingComment && (
            <button
              className="comment__btn edit-cancel--btn"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingComment(null);
              }}
            >
              Отменить редактирование
            </button>
          )}
        </div>
      )}
      {isEditing && id === editingComment && (
        <CommentForm
          handleSubmit={(e) => editSubmit(e, id)}
          text={formText}
          setText={setText}
          isLoading={isLoading}
          label="Редактировать комментарий"
          btnText="Изменить"
        />
      )}
      {!hide && (
        <Confirmation
          hide={hide}
          setHide={setHide}
          className="red"
          onConfirm={handleDelete}
          propTitle="Вы хотите удалить комментарий?"
          propBtn="Удалить"
        />
      )}
    </li>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  editingState: PropTypes.shape({
    isEditing: PropTypes.bool.isRequired,
    editingComment: PropTypes.string,
    formText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    setIsEditing: PropTypes.func.isRequired,
    setEditingComment: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setFetchError: PropTypes.func.isRequired,
  }).isRequired,
};
