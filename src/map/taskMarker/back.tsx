import { StateUpdater } from "preact/hooks";
import { PopupPage } from "./index";
import { FaAngleLeft } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";

const Back = ({ setPage }: { setPage: StateUpdater<PopupPage> }) => {
  return (
    <div className="cursor-pointer" onClick={() => setPage("info")}>
      <FaAngleLeft className="inline" />
      <span className="align-middle"> Back</span>
    </div>
  );
};

export default memo(Back);
