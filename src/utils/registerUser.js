// Функция регистрации нового юзера
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser(email, password) {
  const auth = getAuth();

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      email: user.email,
      token: user.accessToken,
      id: user.uid,
    };
  } catch (error) {
    throw error;
  }
}
