import { UserRole } from "@/types/enums";
import { httpRequest } from "../common/httpClient";

export const loginUser = async (email: string, password: string) => {
  return httpRequest<{ email: string; password: string }, { access_token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: { email, password },
    }
  );
};

export const logoutUser = async (accessToken: string) => {
  return httpRequest< { message: string }, void>(
    "/auth/logout",
    {
      method: "POST",
      token: accessToken,
    }
  );
};

export const getUserInfo = async (accessToken: string) => {
  return httpRequest<{ accessToken: string }, { email: string; role: UserRole; id: string}>( 
    "/user/me", {
    method: "GET",
    token: accessToken,
  })}

export const registerUserWithRole = async (
  email: string,
  password: string,
  role: string,
  accessToken: string
) => {
  return httpRequest<
    { email: string; password: string; role: string },
    { message: string }
  >("/user/register", {
    method: "POST",
    body: { email, password, role },
    token: accessToken,
  });
};