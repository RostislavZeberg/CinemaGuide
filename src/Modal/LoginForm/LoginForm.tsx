import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { queryClient } from "../../api/queryClient";
import { fetchUserLogin } from "../../api/User";

import "./LoginForm.css";

const LoginSchema = z.object({
  email: z.string().email("Введён некорректный Email"),
  password: z.string().min(1, "Поле пароль не должно быть пустым"),
});

type CreateLoginForm = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: { email: string; password: string }) =>
        fetchUserLogin(data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient
  );

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
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
            />
          </svg>
        </div>
      </FormField>
      <FormField label="" errorMessage={errors.password?.message}>
        <div className="input-block">
          <input
            {...register("password")}
            type="password"
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
            />
          </svg>
        </div>
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button
        className="auth-form__button btn-reset"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};
