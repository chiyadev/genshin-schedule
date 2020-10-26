import { h } from "preact";
import { FaCog } from "react-icons/fa";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import Background from "./background";
import { MiscSearch } from "./search";

const Miscellaneous = ({ search }: { search: string }) => {
  const results = useMemo(() => MiscSearch.search(search), [search]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        <FaCog className="w-8 h-8 inline" />
        <span className="align-middle"> Miscellaneous</span>
      </div>

      <div>
        {results.map(result => {
          switch (result) {
            case "background":
              return <Background />;
          }
        })}
      </div>
    </div>
  );
};

export default memo(Miscellaneous);
