import { useEffect, useMemo, useState } from "react";
import { CSSObject } from "@emotion/react";

export function useMeasuredTextWidth(text: string, style: CSSObject) {
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    setUpdate((i) => i + 1);

    // attempt to fix https://github.com/chiyadev/genshin-schedule/issues/2
    if ("fonts" in document) {
      (document as any).fonts.ready.then(() => setUpdate((i) => i + 1));
    }

    // font api is unreliable so force rerender periodically
    const interval = window.setInterval(() => setUpdate((i) => i + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    if (typeof window !== "undefined") {
      const span = document.createElement("span");
      span.innerText = text;

      for (const key of Object.keys(style)) {
        (span.style as any)[key] = (style as any)[key];
      }

      document.body.appendChild(span);
      const width = span.getBoundingClientRect().width;
      document.body.removeChild(span);

      return width;
    }
  }, [update, text, style]);
}
