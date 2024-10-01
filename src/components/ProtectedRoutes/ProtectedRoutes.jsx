import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelect } from "@store/userSlice";

export const ProtectedRoutes = () => {
  const user = useSelector(userSelect);

  // Если данные еще загружаются, то будет отображтся loader
  if (user.isLoading) {
    // return null;
    return <p>Loading...</p>;
  }

  // Проверка на наличие токена у пользователя
  if (!user.token) {
    return <Navigate to="/login" />;
  }

  // Показываем вложенные маршруты
  return <Outlet />;
};
