import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { addPost } from "@store/postSlice";
import { Form } from "@components/Forms/Form/Form";
import { FetchError } from "@components/FetchError/FetchError";
import { MyContext } from "@MyContext/index";
import "./NewPost.css";

export function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fetchError, setFetchError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit() {
    if (title.trim() !== "" && text.trim() !== "") {
      const currentDate = new Date();
      const time = format(currentDate, "d MMMM yyyy, HH:mm", {
        locale: ru,
      });
      dispatch(addPost({ title: title.trim(), text: text.trim(), time })).then(
        (action) => {
          if (addPost.fulfilled.match(action)) {
            // Если добавление поста успешно, перенаправляем на главную
            setText("");
            setTitle("");
            setFetchError(null);
            navigate("/");
          } else {
            // Обработка ошибки, если добавление не удалось
            setFetchError(action.payload);
          }
        }
      );
    } else {
      alert("Заполните все поля");
    }
  }

  return (
    <main>
      <section className="new-post">
        <div className="container">
          <div className="new-post__wrapper">
            {fetchError && (
              <FetchError
                error={fetchError}
                text="Вернуться на главную страницу"
                path="/"
              />
            )}
            {!fetchError && (
              <MyContext.Provider value="Опубликовать">
                <Form
                  title={title}
                  setTitle={setTitle}
                  text={text}
                  setText={setText}
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
