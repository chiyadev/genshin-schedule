import { h } from "preact";
import { memo } from "preact/compat";

const Footer = () => {
  return (
    <div className="container mx-auto p-4 text-xs text-gray-600">
      <div>
        <em>genshin.chiya.dev</em> is not affiliated with <em>miHoYo</em>.
      </div>

      <div>
        Data on this website may not always be accurate or up-to-date with
        in-game changes.
      </div>

      <div className="mt-2">
        Made by{" "}
        <a href="https://chiya.dev" className="font-bold">
          chiya.dev
        </a>
        , hosted on{" "}
        <a
          href="https://github.com/chiyadev/genshin-schedule"
          className="font-bold"
        >
          GitHub
        </a>
        .
      </div>
    </div>
  );
};

export default memo(Footer);
