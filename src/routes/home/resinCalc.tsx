import { h } from "preact";
import { css, cx } from "emotion";
import { useMemo, useRef } from "preact/hooks";
import { useConfig } from "../../configs";
import { ResinCap } from "../../db/resins";

function useMeasuredTextWidth(className: string, text: string) {
  return useMemo(() => {
    const span = document.createElement("span");
    span.className = className;
    span.innerText = text;

    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);

    return width;
  }, [className, text]);
}

const ResinCalculator = () => {
  const [resin, setResin] = useConfig("resin");
  const resinInput = useRef<HTMLInputElement>(null);

  const inputWidth = useMeasuredTextWidth(
    "text-xl font-bold",
    resin.value.toString()
  );

  return (
    <div className="space-y-4">
      <div className="text-lg">Resin calculator</div>

      <div className="bg-white text-black rounded p-4 flex flex flex-col">
        <div className="flex flex-row space-x-2">
          <img src="/assets/game/resin.png" className="w-10 h-10" />

          <input
            ref={resinInput}
            type="number"
            style={{ maxWidth: inputWidth }}
            className={cx(
              "flex-1 text-xl font-bold text-right",
              css`
                background: transparent;
                -moz-appearance: textfield;

                ::-webkit-outer-spin-button,
                ::-webkit-inner-spin-button {
                  /* display: none; <- Crashes Chrome on hover */
                  -webkit-appearance: none;
                  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
                }
              `
            )}
            min={0}
            max={ResinCap}
            value={resin.value}
            onClick={() => resinInput.current.select()}
            onInput={({ currentTarget: { valueAsNumber } }) =>
              setResin({
                value: Math.max(0, Math.min(ResinCap, valueAsNumber || 0)),
                time: Date.now()
              })
            }
          />

          <div className="flex flex-col justify-center">/{ResinCap}</div>
        </div>
      </div>
    </div>
  );
};

export default ResinCalculator;
