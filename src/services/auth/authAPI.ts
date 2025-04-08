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