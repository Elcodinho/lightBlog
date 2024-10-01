import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getPosts, editPost, selectPosts } from "@store/postSlice";
import { Form } from "@components/Forms/Form/Form";
import { FetchError } from "@components/FetchError/FetchError";
import { MyContext } from "@MyContext/index";
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

  const handleSubmit = useCallback(() => {
    if (newTitle.trim() !== "" && newText.trim() !== "") {
      const currentDate = new Date();
      const time = format(currentDate, "d MMMM yyyy, HH:mm", {
        locale: ru,
      });
      dispatch(
        editPost({ id, title: newTitle.trim(), text: newText.trim(), time })
      ).then((action) => {
        if (editPost.fulfilled.match(action)) {
          // Если добавление поста успешно, перенаправляем на главную
          setNewText("");
          setNewTitle("");
          setFetchError(null);
          navigate("/");
        } else {
          // Обработка ошибки, если добавление не удалось
          setFetchError(action.payload);
        }
      });
    } else {
      alert("Заполните все поля");
    }
  }, [dispatch, id, newText, newTitle, navigate]);

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
              <MyContext.Provider value="Редактировать">
                <Form
                  title={newTitle}
                  setTitle={setNewTitle}
                  text={newText}
                  setText={setNewText}
                  handleSubmit={handleSubmit}
                />
              </MyContext.Provider>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
