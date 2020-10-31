import React, { ComponentProps, memo, useEffect, useState } from "react";

export async function getGameImageSrc(name: string): Promise<string> {
  const module = await import(
    /* webpackMode: "eager" */ `./assets/game/${name}.png`
  );

  return module.default;
}

const pixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const GameImage = ({
  name,
  ...props
}: { name: string } & ComponentProps<"img">) => {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        setSrc(await getGameImageSrc(name));
      } catch (e) {
        // ignored
        console.log("could not load image", name, e);
      }
    })();
  }, [name]);

  return (
    <img
      alt={name}
      src={src || pixel}
      className="w-12 h-12 object-contain"
      {...props}
    />
  );
};

export default memo(GameImage);
