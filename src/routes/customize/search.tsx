import { h } from "preact";
import { css, cx } from "emotion";
import { FaSearch } from "react-icons/fa";
import { memo } from "preact/compat";

const Search = ({
  value,
  setValue
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="w-full relative">
      <input
        className={cx(
          "rounded bg-white text-black pl-10 pr-4 py-2 w-full shadow-lg",
          {
            "font-bold": !!value
          }
        )}
        placeholder="Search characters, weapons and artifacts."
        value={value}
        onInput={({ currentTarget: { value } }) => setValue(value)}
      />

      <FaSearch
        className={cx(
          "absolute text-gray-600",
          css`
            left: 1.4em;
            top: 50%;
            transform: translate(-50%, -50%);
          `
        )}
      />
    </div>
  );
};

export default memo(Search);
