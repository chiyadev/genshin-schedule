import React, { memo } from "react";
import { useConfig } from "../../../configs";

const OffsetAlert = () => {
  const [offset, setOffset] = useConfig("offsetDays");

  if (!offset) {
    return null;
  }

  return (
    <div
      className="text-xs text-red-600 font-bold cursor-pointer"
      onClick={() => setOffset(0)}
    >
      Showing schedule in {offset >= 0 ? "+" : "-"}
      {Math.abs(offset)} day{Math.abs(offset) !== 1 && "s"}
    </div>
  );
};

export default memo(OffsetAlert);
