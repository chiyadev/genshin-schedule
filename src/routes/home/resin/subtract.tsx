import { h } from "preact";
import { memo } from "preact/compat";
import { useConfig } from "../../../configs";
import { useServerDate } from "../../../time";
import { clampResin, getResinRecharge } from "../../../db/resins";

const resinUsages = [20, 40, 60];

const Subtract = () => {
  const [, setResin] = useConfig("resin");
  const date = useServerDate(60000);

  return (
    <div className="flex flex-row space-x-1">
      {resinUsages.map(usage => (
        <div
          key={usage}
          className="flex flex-col justify-center text-xs text-gray-600 cursor-pointer"
          onClick={() => {
            setResin(resin => ({
              value: clampResin(
                clampResin(
                  resin.value + getResinRecharge(date.getTime() - resin.time)
                ) - usage
              ),
              time: date.getTime()
            }));
          }}
        >
          -{usage}
        </div>
      ))}
    </div>
  );
};

export default memo(Subtract);
