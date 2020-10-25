import { h } from "preact";

import { memo } from "preact/compat";
import { FaQuestion } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container mx-auto p-4 text-xs text-gray-600 space-y-2">
      <div>
        <a
          href="https://github.com/chiyadev/genshin-schedule/wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaQuestion className="inline" />
          <span className="align-middle">
            {" "}
            Click here for the website guide.
          </span>
        </a>
      </div>

      <div>
        <div>
          <em>genshin.chiya.dev</em> is not affiliated with or endorsed by{" "}
          <em>miHoYo</em>.
        </div>

        <div>
          Data on this website may not always be accurate or up-to-date with
          in-game changes.
        </div>
      </div>

      <div>
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
