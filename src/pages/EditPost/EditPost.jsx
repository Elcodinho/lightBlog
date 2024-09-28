import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getPosts, editPost, selectPosts } from "@store/postSlice";
import { Form } from "@components/Form/Form";
import { FetchError } from "@components/FetchError/FetchError";
import "./EditPost.css";

export function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector(selectPosts);
  const { status, error } = useSelector((state) => state.posts);
  const post = posts.find((item) => item.id === id);

  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [fetchError, setFetchError] = useState(null);

  // Получаем посты
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Устанавливаем заголовок и текст в форму, после того, как посты получены
  useEffect(() => {
    if (post) {
      setNewTitle(post.title);
      setNewText(post.body);
    }
  }, [post]);

  function handleSubmit() {
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
  }

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
              <Form
                title={newTitle}
                setTitle={setNewTitle}
                text={newText}
                setText={setNewText}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
