import { ComponentChildren, h } from "preact";

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
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={({ currentTarget: { checked } }) => setValue(checked)}
      />

      <span> {children}</span>
    </label>
  );
};

export default Checkbox;
