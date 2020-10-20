import { ComponentChildren, h } from "preact";
import { cx } from "emotion";

const WhiteCard = ({
  className,
  children,
  divide
}: {
  className?: string;
  children?: ComponentChildren;
  divide?: boolean;
}) => {
  return (
    <div
      className={cx(
        className,
        "bg-white text-black rounded flex flex-col shadow-lg",
        divide ? "px-4 divide-y divide-gray-300" : "p-4"
      )}
    >
      {children}
    </div>
  );
};

export default WhiteCard;
