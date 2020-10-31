import { Configs } from "../configs";

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type User = {
  username: string;
  createdTime: string;
};

export type WebData = {
  token: string;
  data: Partial<Configs>;
};
