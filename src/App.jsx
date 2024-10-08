import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, startLoading, removeUser } from "@store/userSlice";
import { Layout } from "./components/Layout";
import { HomePage } from "@pages/HomePage/HomePage";
import { NewPostPage } from "@pages/NewPostPage/NewPostPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { RegisterPage } from "@pages/RegisterPage/RegisterPage";
import { LoginPage } from "@pages/LoginPage/LoginPage";
import { PostPage } from "@pages/PostPagePage/PostPagePage";
import { EditPostPage } from "@pages/EditPostPage/EditPostPage";
import { ProtectedRoutes } from "@components/ProtectedRoutes/ProtectedRoutes";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

import { AnimatedRoutes } from "@components/UI/Transition/Transition"; // Компонент анимации

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(startLoading()); // Устанавливаем флаг загрузки
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData)); // Устанавливаем пользователя
    } else {
      dispatch(removeUser()); // Если данных нет, сбрасываем пользователя
    }
  }, [dispatch]);
  return (
    <>
      <AnimatedRoutes>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            {/* Группа страниц доступна только авторизованным пользователям */}
            <Route element={<ProtectedRoutes />}>
              <Route path="newpost" element={<NewPostPage />} />
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="posts/:id/edit" element={<EditPostPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AnimatedRoutes>
    </>
  );
}

export default App;
