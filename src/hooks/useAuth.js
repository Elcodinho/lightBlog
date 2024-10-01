import { useSelector } from "react-redux";
import { userSelect } from "@store/userSlice";

export function useAuth() {
  const user = useSelector(userSelect);
  if (user.email) {
    return user;
  }
  return null;
}
