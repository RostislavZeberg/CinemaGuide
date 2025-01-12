import { FC, useState } from "react";

import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

import "./AuthForm.css";
import { Button } from "../../components/Button";

interface logInProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthForm: FC<logInProps> = ({ modalActive, setModalActive }) => {
  const [authType, setAuthType] = useState<string>("register");
  const [vestibuleView, setVestibuleView] = useState(false);

  const handlerBtnCloseModal = () => {
    setModalActive(false);
    setAuthType("register");
  };

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  const handlerVestibule = () => {
    setAuthType("register");
    setVestibuleView(false);
  };

  return (
    <div className={modalActive ? "modal active" : "modal"}>
      <div className="auth-form" style={{ width: "fit-content" }}>
        <div className="logo-modal"></div>
        {authType === "register" ? (
          <LoginForm />
        ) : (
          <RegisterForm setVestibuleView={setVestibuleView} />
        )}
        <div className="auth-form__info">
          <button className="btn-reset btn-change" onClick={handleClick}>
            {authType === "register" ? "Регистрация" : "У меня есть пароль"}
          </button>
        </div>
        <div
          className={
            vestibuleView ? "auth-form__vestibule vestibule" : "vestibule-none"
          }
        >
          <h4 className="vestibule__title">Регистрация завершена</h4>
          <p className="vestibule__descr">
            Используйте вашу электронную почту для входа
          </p>
          <Button
            className="auth-form__button btn-reset"
            onClick={handlerVestibule}
          >
            Войти
          </Button>
        </div>
        <button
          onClick={handlerBtnCloseModal}
          className="modal__close btn-reset"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
