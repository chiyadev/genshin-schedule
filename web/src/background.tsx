import React, { memo } from "react";
import { useConfig } from "./configs";
import { css, cx } from "emotion";
import Paimon from "./assets/game/Paimon.png";

const Background = () => {
  const [background] = useConfig("paimonBg");

  if (!background) {
    return null;
  }

  return (
    <img
      alt="background"
      src={Paimon}
      className={cx(
        "fixed",
        css`
          z-index: -10;
          opacity: 5%;
          right: -5%;
          bottom: -20%;
        `
      )}
    />
  );
};

export default memo(Background);
