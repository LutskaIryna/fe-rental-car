import { navigationStrategies } from "@/strategies/navigation";
import { UserRole } from "./enums";

export type User = {
  id: string;
  role: UserRole;
  email: string;
};

export type UserStatus = keyof typeof navigationStrategies;