import { Configs } from "../configs";
import { Patch } from "rfc6902";

export type User = {
  username: string;
  createdTime: string;
};

export type WebData = {
  token: string;
  data: Partial<Configs>;
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type SyncRequest = {
  token: string;
  patch: Patch;
};

export type SyncResponse = {
  token: string;
};
