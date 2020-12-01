import { Patch } from "rfc6902";
import { Configs } from "./configs";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSidePropsContext } from "next";
import node_fetch from "node-fetch";

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

export const PublicApiUrl = process.env.NEXT_PUBLIC_API_PUBLIC || "https://genshin.chiya.dev/api/v1";
export const InternalApiUrl = process.env.NEXT_PUBLIC_API_INTERNAL || PublicApiUrl;

export function createApiClient(ctx?: Pick<GetServerSidePropsContext, "req">): ApiClient {
  return new ApiClient(ctx?.req ? InternalApiUrl : PublicApiUrl, getAuthToken(ctx));
}

export function getAuthToken(ctx?: Pick<GetServerSidePropsContext, "req">): string | undefined {
  return parseCookies(ctx).token;
}

export function setAuthToken(ctx?: Pick<GetServerSidePropsContext, "res">, token?: string) {
  if (token) {
    setCookie(ctx, "token", token, {
      sameSite: "strict",
      secure: window.location.protocol === "https:",
      expires: new Date(2100, 1, 1),
    });
  } else {
    destroyCookie(ctx, "token");
  }
}

export class ApiClient {
  constructor(public baseUrl: string, public token?: string) {}

  get authenticated() {
    return !!this.token;
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

  async getSync(): Promise<WebData> {
    const response = await fetch(`${this.baseUrl}/sync`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
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
    const response = await fetch(`${this.baseUrl}/sync`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json-patch+json",
        authorization: `Bearer ${this.token}`,
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
}
