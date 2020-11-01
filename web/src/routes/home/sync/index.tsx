import React, { memo } from "react";
import WhiteCard from "../../../whiteCard";
import { WiCloud } from "react-icons/wi";
import Body from "./body";
import { useLocalConfig } from "../../../configs";

const Sync = () => {
  const [auth] = useLocalConfig("auth");

  // temporary disable
  if (auth || true) {
    return null;
  }

  return (
    <WhiteCard divide>
      <div className="py-4 flex flex-row space-x-2">
        <WiCloud className="w-10 h-10" />

        <div className="flex flex-col justify-center">
          <div className="text-lg font-bold">Sign In</div>
          <div className="text-xs text-gray-600">
            Start synchronizing data across devices
          </div>
        </div>
      </div>

      <div className="py-4">
        <Body />
      </div>
    </WhiteCard>
  );
};

export default memo(Sync);
