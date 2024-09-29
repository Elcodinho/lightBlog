import { Button } from "@components/Button/Button";
import "./AuthForm.css";

export function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) {
  return (
    <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="auth__input"
        type="text"
        placeholder="Введите Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth__input"
        type="password"
        placeholder="Введите пароль"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        text="Создать аккаунт"
        className="green"
        onClick={handleSubmit}
      />
    </form>
  );
}
