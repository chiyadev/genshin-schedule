import { useState } from "preact/hooks";
import { css, cx } from "emotion";
import Header from "../../header";
import { h } from "preact";
import { memo } from "preact/compat";

const HeaderWrapper = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cx(
        "absolute w-full top-0 z-10",
        { "opacity-50": !hover },
        css`
          background: ${hover
            ? "#2e313d"
            : "linear-gradient(rgba(46, 49, 61, 1) 0%, rgba(255, 255, 255, 0) 100%)"};
        `
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Header />
    </div>
  );
};

export default memo(HeaderWrapper);
