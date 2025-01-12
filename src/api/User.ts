import { z } from "zod";

import { validateResponse } from "./validateResponse";
import { API_URL } from "./Movie";

export const UserRegistrationSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

export const UserLoginSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: z.array(z.string()),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export function fetchUserLogin(email: string, password: string): Promise<void> {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchUserRegistration(
  email: string,
  name: string,
  surname: string,
  password: string
): Promise<void> {
  return fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, surname, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<UserLogin> {
  return fetch(`${API_URL}/profile`, { credentials: "include" })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserLoginSchema.parse(data));
}

export function exitUser(): Promise<void> {
  return fetch(`${API_URL}/auth/logout`, { credentials: "include" }).then(
    () => undefined
  );
}

