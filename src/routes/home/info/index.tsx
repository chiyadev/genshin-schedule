import { h } from "preact";
import WhiteCard from "../../../whiteCard";
import { memo } from "preact/compat";
import Hide from "./hide";
import { useConfig } from "../../../configs";

const Info = () => {
  const [visible] = useConfig("showSiteInfo");

  if (!visible) {
    return null;
  }

  return (
    <WhiteCard divide>
      <div className="py-4 flex flex-row space-x-2">
        <img
          alt="Genshin Schedule"
          src="/assets/apple-touch-icon.png"
          className="w-10 h-10 rounded"
        />

        <div className="flex flex-col justify-center">
          <div className="text-lg font-bold">Genshin Schedule</div>
          <div className="text-xs text-gray-600">Website Information</div>
        </div>
      </div>

      <div className="py-4 text-sm space-y-4">
        <div>
          Genshin Schedule is a website to help you keep track of time-related
          game activities in Genshin Impact.
        </div>

        <ul className="list-disc list-inside">
          <li>
            <strong>Server Clock</strong> &mdash; Displays the current server
            time.
          </li>

          <li>
            <strong>Resin Calculator</strong> &mdash; Tracks your resins over
            time and estimates when it will recharge.
          </li>

          <li>
            <strong>Task Scheduler</strong> &mdash; Tracks open world resources
            and indicates when they can be collected again.
          </li>

          <li>
            <strong>Domain View</strong> &mdash; Shows which domains can be
            cleared today for character talent/weapon ascension materials.
          </li>
        </ul>

        <div>
          This website is still a work-in-progress, so some features are not
          implemented yet.
        </div>

        <ul className="list-disc list-inside">
          <li>
            No data synchronization &mdash; All data is stored locally on the
            browser for now.
          </li>
          <li>
            Missing character ascension crystals &mdash; In consideration; World
            boss drops do not rotate, but it might be helpful to display them
            here nonetheless.
          </li>
        </ul>

        <div>
          <span>Please refer to the </span>
          <a
            href="https://github.com/chiyadev/genshin-schedule/wiki"
            className="text-blue-600"
          >
            website guide
          </a>
          <span> for usage help.</span>
        </div>
      </div>

      <div className="py-4 text-sm">
        <Hide />
      </div>
    </WhiteCard>
  );
};

export default memo(Info);
