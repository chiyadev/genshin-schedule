import React, { memo, ReactNode } from "react";
import { Configs, useConfig } from "../../configs";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { cx } from "emotion";

const Heading = ({
  type,
  children,
}: {
  type: keyof Configs["hiddenWidgets"];
  children?: ReactNode;
}) => {
  const [hidden, setHidden] = useConfig("hiddenWidgets");

  return (
    <div
      className={cx("flex flex-row space-x-1 flex flex-row cursor-pointer", {
        "text-gray-600": hidden[type],
      })}
      onClick={() => {
        setHidden((widgets) => ({ ...widgets, [type]: !widgets[type] }));
      }}
    >
      <div className="flex flex-col justify-center">
        {hidden[type] ? <FaCaretRight /> : <FaCaretDown />}
      </div>

      <div className="text-lg"> {children}</div>
    </div>
  );
};

export default memo(Heading);
