import { Patch } from "rfc6902";
import { Config } from "./config";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSidePropsContext } from "next";
import node_fetch from "node-fetch";
import { Language, LanguageAliases, Languages } from "../langs";
import { pick as parseLanguage } from "accept-language-parser";

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
  constructor(public baseUrl: string, public token?: string, public language?: Language) {}

  get authenticated() {
    return typeof this.token === "string" && !this.anonymous;
  }

  get anonymous() {
    return this.token === "null";
  }

  fetch(input: Request | string, init?: RequestInit): Promise<Response> {
    if (typeof window !== "undefined") {
      return window.fetch(input, init);
    } else {
      return (node_fetch as any)(input, { ...init, highWaterMark: 1024 * 1024 * 1024 });
    }
  }

  async auth(request: AuthRequest): Promise<AuthResponse> {
    const response = await this.fetch(`${this.baseUrl}/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async authBypass(request: Pick<AuthRequest, "username">): Promise<AuthResponse> {
    const response = await this.fetch(`${this.baseUrl}/users/${request.username}/auth`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async updateAuth(request: AuthRequest): Promise<AuthResponse> {
    const response = await this.fetch(`${this.baseUrl}/auth`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async getSelf(): Promise<User> {
    const response = await this.fetch(`${this.baseUrl}/auth`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async getSync(): Promise<WebData> {
    const response = await this.fetch(`${this.baseUrl}/sync`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async patchSync(
    request: SyncRequest
  ): Promise<({ type: "success" } & SyncResponse) | ({ type: "failure" } & WebData)> {
    const response = await this.fetch(`${this.baseUrl}/sync`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json-patch+json",
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      return {
        ...(await response.json()),
        type: "success",
      };
    } else if (response.status === 400) {
      return {
        ...(await response.json()),
        type: "failure",
      };
    } else {
      throw Error(await response.text());
    }
  }

  async listNotifications(): Promise<Notification[]> {
    const response = await this.fetch(`${this.baseUrl}/notifications`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async getNotification(key: string): Promise<Notification> {
    const response = await this.fetch(`${this.baseUrl}/notifications/${key}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    } else {
      return await response.json();
    }
  }

  async setNotification(notification: Notification) {
    const response = await this.fetch(`${this.baseUrl}/notifications/${notification.key}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(notification),
    });

    if (!response.ok) {
      throw Error(await response.text());
    }
  }

  async deleteNotification(key: string) {
    const response = await this.fetch(`${this.baseUrl}/notifications/${key}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    }
  }
}
