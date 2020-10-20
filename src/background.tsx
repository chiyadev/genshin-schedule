import { useConfig } from "./configs";
import { h } from "preact";
import { css, cx } from "emotion";

const Background = () => {
  const [background] = useConfig("paimonBg");

  if (!background) {
    return null;
  }

  return (
    <img
      alt="Paimon"
      src="/assets/game/Paimon.png"
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

export default Background;
