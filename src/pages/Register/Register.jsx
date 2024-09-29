import { useState } from "react";
import { AuthForm } from "@components/AuthForm/AuthForm";
import "./Register.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (email.trim() !== "" && password.trim() !== "") {
      setEmail("");
      setPassword("");
    } else {
      alert("Заполните все поля");
    }
  }

  return (
    <main>
      <section className="register">
        <div className="container">
          <div className="register__wrapper">
            <h2 className="register__title">Регистрация</h2>
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
