import { FC } from "react";
import { useMutation } from "@tanstack/react-query";

import { exitUser, UserLogin } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Link } from "react-router-dom";

interface SettingAccountProps {
  profile: UserLogin;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingAccount: FC<SettingAccountProps> = ({
  profile,
  setLogIn,
  setAuthForm,
}) => {
  const exitMutation = useMutation(
    {
      mutationFn: () => exitUser(),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient
  );

  const handlerExitAccount = () => {
    exitMutation.mutate();
    setLogIn(true);
    setAuthForm(false);
  };

  return (
    <div className="account__setting setting">
      <div className="setting__descr">
        <div className="setting__block setting__user user">
          <div className="setting__background">
            {profile.name.charAt(0)}
            {profile.surname.charAt(0)}
          </div>
          <div>
            <p className="setting__title">Имя Фамилия</p>
            <div className="user__name name">
              <h3 className="name__name">{profile.name}</h3>
              <h3 className="name__surname">{profile.surname}</h3>
            </div>
          </div>
        </div>
        <div className="setting__block setting__email email">
          <div className="setting__background">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <p className="setting__title">Электронная почта</p>
            <h3 className="user__name">{profile.email}</h3>
          </div>
        </div>
      </div>
      <Link
        to={"/"}
        onClick={handlerExitAccount}
        className="auth-form__button btn-exit"
      >
        Выйти из аккаунта
      </Link>
    </div>
  );
};
