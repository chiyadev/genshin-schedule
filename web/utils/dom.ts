import { useEffect, useState } from "react";
import { CSSObject } from "@emotion/react";

export function useMeasuredTextWidth(text: string, style: CSSObject) {
  const [value, setValue] = useState<number>();
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    // attempt to fix https://github.com/chiyadev/genshin-schedule/issues/2
    if ("fonts" in document) {
      (document as any).fonts.ready.then(() => setUpdate((i) => i + 1));
    }

    // font api is unreliable so force rerender periodically
    const interval = window.setInterval(() => setUpdate((i) => i + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const span = document.createElement("span");
    span.innerText = text;

    for (const key of Object.keys(style)) {
      (span.style as any)[key] = (style as any)[key];
    }

    document.body.appendChild(span);
    const { width } = span.getBoundingClientRect();
    document.body.removeChild(span);

    setValue(width);
  }, [update, text, style]);

  return value;
}
