import { h } from "preact";

const Help = () => {
  return (
    <div className="text-xs text-gray-600">
      <div>Select items to be added to your farming schedule.</div>
      <div>
        If there are any missing items, please{" "}
        <a
          href={`https://github.com/chiyadev/genshin-schedule/issues/new?title=${encodeURIComponent(
            "bug: Missing item in database {insert item name}"
          )}`}
          className="font-bold"
        >
          create an issue
        </a>{" "}
        on GitHub.
      </div>
    </div>
  );
};

export default Help;
