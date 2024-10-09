import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getPosts, editPost, selectPosts } from "@store/postSlice";
import { Form } from "@components/Forms/Form/Form";
import { FetchError } from "@components/FetchError/FetchError";
import { BtnContext } from "@MyContext/BtnContext";
import "./EditPost.css";

export function EditPost() {
  const { id } = useParams(); // получаем id из url
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector(selectPosts);
  const { status, error } = useSelector((state) => state.posts);
  const post = posts.find((item) => item.id === id); // Находим нужный для редактирования пост с помощью id поста

  const [newTitle, setNewTitle] = useState(""); // Состояние заголовка поста для редактирования
  const [newText, setNewText] = useState(""); // Состояние текста поста для редактирования
  const [fetchError, setFetchError] = useState(null); // Состояние ошибки при отправке на сервер редактированного поста

  // Получаем посты только, если они еще не получены
  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
    }
  }, [dispatch, posts.length]);

  // Устанавливаем заголовок и текст в форму, после того, как посты получены
  useEffect(() => {
    if (post) {
      setNewTitle(post.title);
      setNewText(post.body);
    }
  }, [post]);

  // Функция отправки формы для редактировани поста
  const handleSubmit = useCallback(async () => {
    const currentDate = new Date();
    const time = format(currentDate, "d MMMM yyyy, HH:mm", {
      locale: ru,
    });
    const author = post?.author;
    try {
      const action = await dispatch(
        editPost({
          id,
          title: newTitle.trim(),
          text: newText.trim(),
          time,
          author,
        })
      );
      if (editPost.fulfilled.match(action)) {
        setNewText("");
        setNewTitle("");
        setFetchError(null);
        navigate("/");
      } else {
        setFetchError(action.payload);
      }
    } catch (error) {
      setFetchError("Произошла ошибка");
    }
  }, [dispatch, id, newText, newTitle, post?.author, navigate]);

  return (
    <main>
      <section className="edit">
        <div className="container">
          <div className="edit__wrapper">
            {status === "loading" && <h2 className="loading">Loading...</h2>}
            {error && (
              <FetchError
                error={error}
                text="Вернуться к списку постов"
                path="/"
              />
            )}
            {fetchError && !error && (
              <FetchError
                error={fetchError}
                text="Вернуться к списку постов"
                path="/"
              />
            )}
            {status === "resolved" && (
              <BtnContext.Provider
                value={{
                  confirmTitle: "Редактировать пост?",
                  confirmBtn: "Редактировать",
                }}
              >
                <Form
                  title={newTitle} // Заголовок поста
                  setTitle={setNewTitle}
                  text={newText} // Текст поста
                  setText={setNewText}
                  btnText="Редактировать пост" // Текст кнопки в форме
                  handleSubmit={handleSubmit} // Функция submit
                />
              </BtnContext.Provider>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
