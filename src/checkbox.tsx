import { ComponentChildren, h } from "preact";
import { memo } from "preact/compat";

const Checkbox = ({
  value,
  setValue,
  children
}: {
  value: boolean;
  setValue: (value: boolean) => void;
  children?: ComponentChildren;
}) => {
  return (
    <label className="flex flex-row space-x-2">
      <div className="flex flex-col justify-center">
        <input
          type="checkbox"
          checked={value}
          onChange={({ currentTarget: { checked } }) => setValue(checked)}
        />
      </div>

      <div>{children}</div>
    </label>
  );
};

export default memo(Checkbox);
