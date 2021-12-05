import { Patch } from "rfc6902";
import { Config } from "./config";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSidePropsContext } from "next";
import { Language, LanguageAliases } from "../langs";
import { pick as parseLanguage } from "accept-language-parser";
import axios, { Axios } from "axios";

export type User = {
  username: string;
  createdTime: number;
  isAdmin: boolean;
  discordUserId?: number;
};

export type WebData = {
  token: string;
  data: Partial<Config>;
};

export type Notification = {
  key: string;
  time: number;
  icon: string;
  title: string;
  description: string;
  url: string;
  color: string;
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

export const ApiUrlDefault = "https://genshin.chiya.dev/api/v1";
export const ApiUrlPublic = process.env.NEXT_PUBLIC_API_PUBLIC || ApiUrlDefault;
export const ApiUrlInternal = process.env.NEXT_PUBLIC_API_INTERNAL || ApiUrlPublic;

export function createApiClient(ctx?: Pick<GetServerSidePropsContext, "req">): ApiClient {
  return new ApiClient(ctx?.req ? ApiUrlInternal : ApiUrlPublic, getAuthToken(ctx), getLanguage(ctx));
}

export function getLanguage(ctx?: Pick<GetServerSidePropsContext, "req">): Language {
  let alias: string;

  if (ctx) {
    alias = parseLanguage(Object.keys(LanguageAliases), ctx.req.headers["accept-language"] || "") || "";
  } else {
    alias = Object.keys(LanguageAliases).find((lang) => lang === navigator.language) || "";
  }

  return LanguageAliases[alias] || "en-US";
}

export function getAuthToken(ctx?: Pick<GetServerSidePropsContext, "req">): string | undefined {
  return parseCookies(ctx).token;
}

export function setAuthToken(ctx?: Pick<GetServerSidePropsContext, "res">, token?: string) {
  if (token) {
    setCookie(ctx, "token", token, {
      sameSite: "lax",
      secure: window.location.protocol === "https:",
      expires: new Date(2100, 1, 1),
      path: "/",
    });
  } else {
    destroyCookie(ctx, "token", {
      path: "/",
    });
  }
}

export class ApiClient {
  readonly axios: Axios;

  constructor(public baseUrl: string, public token?: string, public language?: Language) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  get authenticated() {
    return typeof this.token === "string" && !this.anonymous;
  }

  get anonymous() {
    return this.token === "null";
  }

  async auth(request: AuthRequest): Promise<AuthResponse> {
    return (await this.axios.post("auth", request)).data;
  }

  async authBypass(request: Pick<AuthRequest, "username">): Promise<AuthResponse> {
    return (await this.axios.get(`users/${request.username}/auth`)).data;
  }

  async updateAuth(request: AuthRequest): Promise<AuthResponse> {
    return (await this.axios.put("auth", request)).data;
  }

  async getSelf(): Promise<User> {
    return (await this.axios.get("auth")).data;
  }

  async getSync(): Promise<WebData> {
    return (await this.axios.get("sync")).data;
  }

  async patchSync(
    request: SyncRequest
  ): Promise<({ type: "success" } & SyncResponse) | ({ type: "failure" } & WebData)> {
    try {
      const response = await this.axios.patch("sync", request, {
        headers: { "content-type": "application/json-patch+json" },
      });

      return {
        ...response.data,
        type: "success",
      };
    } catch (e: any) {
      if (e.response.status === 400) {
        return {
          ...e.response.data,
          type: "failure",
        };
      }

      throw e;
    }
  }

  async listNotifications(): Promise<Notification[]> {
    return (await this.axios.get("notifications")).data;
  }

  async getNotification(key: string): Promise<Notification> {
    return (await this.axios.get(`notifications/${key}`)).data;
  }

  async setNotification(notification: Notification) {
    await this.axios.put(`notifications/${notification.key}`, notification);
  }

  async deleteNotification(key: string) {
    await this.axios.delete(`notifications/${key}`);
  }
}
