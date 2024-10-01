// Функция авторизации юзера
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  const auth = getAuth();

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return {
      email: user.email,
      token: user.accessToken,
      id: user.uid,
    };
  } catch (error) {
    throw error;
  }
}
