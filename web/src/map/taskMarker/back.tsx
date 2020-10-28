import React, { Dispatch, memo } from "react";
import { PopupPage } from "./index";
import { FaAngleLeft } from "react-icons/fa";

const Back = ({ setPage }: { setPage: Dispatch<PopupPage> }) => {
  return (
    <div className="cursor-pointer" onClick={() => setPage("info")}>
      <FaAngleLeft className="inline" />
      <span className="align-middle"> Back</span>
    </div>
  );
};

export default memo(Back);
