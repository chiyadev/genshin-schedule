// umami tracker typescript port: https://gist.github.com/phosphene47/81c3545b90c21e8d33be416a602f1388

const connectionStr = process.env.NEXT_PUBLIC_UMAMI_URL; // connection format "https://umami/websiteId"
let connection: undefined | { collectUrl: string; websiteId: string };

if (typeof window !== "undefined" && connectionStr) {
  const url = new URL(connectionStr, new URL(window.location.href));

  connection = {
    collectUrl: new URL("/api/collect", url).href,
    websiteId: url.pathname.substring(1),
  };
}

/** Collects an arbitrary Umami metric. */
export function collect(type: string, data: Record<string, any>) {
  if (!process.browser) {
    return;
  }

  const request = {
    type,
    payload: {
      website: connection?.websiteId,
      hostname: window.location.hostname,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      cache: sessionStorage.getItem("umami.cache") || undefined,

      ...data,
    },
  };

  if (process.env.NODE_ENV === "development") {
    console.log("umami", type, request);
  }

  if (!connection) {
    return;
  }

  (async () => {
    try {
      const response = await fetch(connection.collectUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      sessionStorage.setItem("umami.cache", await response.text());
    } catch {
      // ignored
    }
  })();
}

let currentPath: string | undefined;

/** Collects a page view metric. */
export function trackView(path: string, referrer = document.referrer) {
  collect("pageview", {
    url: (currentPath = path),
    referrer,
  });
}

/** Collects an event metric for the current page. */
export function trackEvent(type: string, value: string) {
  if (!currentPath) {
    return;
  }

  collect("event", {
    url: currentPath,
    event_type: type.replace(" ", "-").toLowerCase(),
    event_value: value,
  });
}
