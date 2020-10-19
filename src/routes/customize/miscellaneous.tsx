import Checkbox from "../../checkbox";
import { h } from "preact";
import { useConfig } from "../../configs";
import { FaCog } from "react-icons/fa";
import { MemorySearch } from "../../memorySearch";
import { useMemo } from "preact/hooks";

type Option = "background";
const options: Option[] = ["background"];

const db = new MemorySearch<Option>();

for (const option of options) {
  db.add("miscellaneous", option);
}

db.add("emergency food", "background");

const Miscellaneous = ({ search }: { search: string }) => {
  const results = useMemo(() => db.search(search), [search]);
  const [background, setBackground] = useConfig("paimonBg");

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
              return (
                <Checkbox value={background} setValue={setBackground}>
                  Emergency food
                </Checkbox>
              );
          }
        })}
      </div>
    </div>
  );
};

export default Miscellaneous;
