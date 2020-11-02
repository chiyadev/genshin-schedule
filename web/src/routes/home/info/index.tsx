import React, { memo } from "react";
import WhiteCard from "../../../whiteCard";
import Hide from "./hide";
import { useConfig } from "../../../configs";
import Favicon180x180 from "../../../assets/favicon-180x180.png";

const Info = () => {
  const [hidden] = useConfig("hiddenWidgets");

  if (hidden.info) {
    return null;
  }

  return (
    <WhiteCard divide>
      <div className="py-4 flex flex-row space-x-2">
        <img
          alt="Genshin Schedule"
          src={Favicon180x180}
          className="w-10 h-10 rounded"
        />

        <div className="flex flex-col justify-center">
          <div className="text-lg font-bold">Genshin Schedule</div>
          <div className="text-xs text-gray-600">Website information</div>
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
