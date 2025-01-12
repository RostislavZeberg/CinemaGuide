import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { queryClient } from "../../api/queryClient";
import { fetchUserRegistration } from "../../api/User";

import "./RegisterForm.css";
import { FC, useState } from "react";

const RegisterSchema = z.object({
  email: z.string().email("Введён некорректный Email"),
  name: z.string().min(1, "Поле 'Имя' не должно быть пустым"),
  surname: z.string().min(1, "Поле 'Фамилия' не должно быть пустым"),
  password: z.string().min(1, "Поле 'Пароль' не должно быть пустым"),
});

type CreateRegisterForm = z.infer<typeof RegisterSchema>;

interface registerFormProps {
  setVestibuleView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm: FC<registerFormProps> = ({ setVestibuleView }) => {
  const [registerForm, setRegisterForm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: {
        email: string;
        name: string;
        surname: string;
        password: string;
      }) =>
        fetchUserRegistration(
          data.email,
          data.name,
          data.surname,
          data.password
        ),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient
  );

  return (
    <form
      className={registerForm ? "register-form" : "register-form-none"}
      onSubmit={handleSubmit(({ email, name, surname, password }) => {
        registerMutation.mutate({ email, name, surname, password });
        setVestibuleView(true);
        setRegisterForm(false);
      })}
    >
      <FormField label="" errorMessage={errors.email?.message}>
        <div className="input-block">
          <input {...register("email")} placeholder="Электронная почта" />
          <svg
            className="input-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
              fill="black"
              // opacity="0.4"
            />
          </svg>
        </div>
      </FormField>
      <FormField label="" errorMessage={errors.name?.message}>
        <div className="input-block">
          <input {...register("name")} placeholder="Имя" />
          <svg
            className="input-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
              fill="black"
              // fill-opacity="0.4"
            />
          </svg>
        </div>
      </FormField>
      <FormField label="" errorMessage={errors.surname?.message}>
        <div className="input-block">
          <input {...register("surname")} placeholder="Фамилия" />
          <svg
            className="input-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
              fill="black"
              // fill-opacity="0.4"
            />
          </svg>
        </div>
      </FormField>
      <FormField label="" errorMessage={errors.password?.message}>
        <div className="input-block">
          <input
            type="password"
            {...register("password")}
            placeholder="Пароль"
          />
          <svg
            className="input-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
              fill="black"
              // fill-opacity="0.4"
            />
          </svg>
        </div>
      </FormField>
      <FormField label="" errorMessage={errors.password?.message}>
        <div className="input-block">
          <input
            type="password"
            {...register("password")}
            placeholder="Подтвердите пароль"
          />
          <svg
            className="input-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
              fill="black"
              // fill-opacity="0.4"
            />
          </svg>
        </div>
      </FormField>

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button
        className="auth-form__button btn-reset"
        type="submit"
        isLoading={registerMutation.isPending}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};
