import { ComponentChildren, h } from "preact";
import { memo } from "preact/compat";
//import { css, cx } from "emotion";

const SectionHeading = ({ children }: { children?: ComponentChildren }) => {
  return (
    <div className="text-lg flex flex-row space-x-4">
      <div>{children}</div>

      {/*
      <div className="flex-1">
        <div
          className={cx(
            "border-b border-gray-700",
            css`
              height: 50%;
            `
          )}
        />
      </div>*/}
    </div>
  );
};

export default memo(SectionHeading);
