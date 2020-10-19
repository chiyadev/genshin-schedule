import MapControl from "../../map";
import { h } from "preact";
import { css, cx } from "emotion";
import Header from "../../header";
import { useState } from "preact/hooks";

const Map = () => {
  return (
    <div className="w-full h-screen">
      <HeaderWrapper />

      <MapControl
        className={cx(
          "w-full h-full",
          css`
            background: #2e313d;
            z-index: 0;
          `
        )}
      />
    </div>
  );
};

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

export default Map;
