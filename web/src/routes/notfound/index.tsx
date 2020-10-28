import React, { memo } from "react";
import { useTabTitle } from "../../utils";

const NotFound = () => {
  useTabTitle("Not Found");

  return (
    <div className="container mx-auto p-4">
      <div className="font-bold text-xl mb-4">404 Not Found</div>

      <div className="mb-4">Requested page does not exist.</div>
    </div>
  );
};

export default memo(NotFound);
