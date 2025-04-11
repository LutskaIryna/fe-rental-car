import { UserRole } from "./enums";

export type User = {
  id: string;
  role: UserRole;
  email: string;
};
export type UserStatus = "loading" | "unauthorized" | UserRole;