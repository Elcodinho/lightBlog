import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "@store/postSlice";
import { userSelect } from "@store/userSlice";
import { Form } from "@components/Forms/Form/Form";
import { FetchError } from "@components/FetchError/FetchError";
import { BtnContext } from "@MyContext/BtnContext";
import "./NewPost.css";

export function NewPost() {
  const [title, setTitle] = useState(""); // Состояние заголовка поста
  const [text, setText] = useState(""); // Состояние текста поста
  const [fetchError, setFetchError] = useState(null); // Состояние ошибки при отправке запросе о добавлении нового поста
  const user = useSelector(userSelect);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    const currentDate = new Date();
    const time = format(currentDate, "d MMMM yyyy, HH:mm", {
      locale: ru,
    });
    const author = user.email;
    try {
      const action = await dispatch(
        addPost({ title: title.trim(), text: text.trim(), time, author })
      );
      if (addPost.fulfilled.match(action)) {
        setText("");
        setTitle("");
        setFetchError(null);
        navigate("/");
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
              <BtnContext.Provider
                value={{
                  confirmTitle: "Опубликовать пост?", // Заголовок для Confirmation
                  confirmBtn: "Опубликовать", // Текст кнопки для Confirmation
                }}
              >
                <Form
                  title={title} // Заголовок поста
                  setTitle={setTitle}
                  text={text} // Текст поста
                  setText={setText}
                  btnText="Добавить пост" // Текст кнопки в форме
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
