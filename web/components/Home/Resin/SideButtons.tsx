import React, { memo } from "react";
import { useConfig, useCurrentStats } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { clampResin, getResinRecharge, ResinCap } from "../../../db/resins";
import { trackEvent } from "../../../utils/umami";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIntl } from "react-intl";

const SideButtons = ({ current }: { current: number }) => {
  const time = useServerTime(1000);
  const [, setResin] = useConfig("resin");
  const [buttons] = useConfig("resinCalcButtons");
  const [, setStats] = useCurrentStats();

  return (
    <ButtonGroup isAttached>
      {buttons.map((delta) => {
        // round down, without clamping because we need to check for extremities
        const rounded = Math.floor(current + delta);

        // if addition, don't overflow
        // if subtraction, don't underflow
        if ((delta < 0 && rounded >= 0) || (delta > 0 && rounded <= ResinCap)) {
          return (
            <SideButton
              key={delta}
              value={delta}
              onClick={() => {
                setResin((resin) => ({
                  value: clampResin(clampResin(resin.value + getResinRecharge(time.valueOf() - resin.time)) + delta),
                  time: time.valueOf(),
                }));

                if (delta < 0) {
                  setStats((stats) => ({ ...stats, resinsSpent: stats.resinsSpent - delta }));
                  trackEvent("resin", `resinSub${Math.abs(delta)}`);
                } else {
                  trackEvent("resin", `resinAdd${delta}`);
                }
              }}
            />
          );
        }
      })}
    </ButtonGroup>
  );
};

const SideButton = ({ value, onClick }: { value: number; onClick: () => void }) => {
  const { formatMessage } = useIntl();

  // conditional hotkey react hook: breaks rules of hooks
  // but `value` never changes (see `key={delta}` above) so it's fine
  // value must be two digits and multiple of ten, otherwise keys could conflict
  if (Math.abs(value) < 100 && value % 10 === 0) {
    const num = Math.abs(value).toString().slice(0, 1);
    let hotkeys = [`${num}`];

    // https://github.com/chiyadev/genshin-schedule/pull/56
    // support numpad keys for niche cases (e.g. Firefox on macOS)
    hotkeys.push(`num_${num}`);

    if (value > 0) {
      // backwards compat: `num` for sub, `shift+num` for add
      hotkeys = hotkeys.map((key) => `shift+${key}`);
    }

    useHotkeys(
      hotkeys.join(", "),
      (e) => {
        onClick();
        e.preventDefault();
      },
      [onClick]
    );
  }

  return (
    <Button
      color="gray.500"
      size="sm"
      p={2}
      onClick={onClick}
      title={
        value > 0
          ? formatMessage({ defaultMessage: "Add {amount} resins" }, { amount: value })
          : formatMessage({ defaultMessage: "Subtract {amount} resins" }, { amount: Math.abs(value) })
      }
    >
      {value > 0 ? `+${value}` : `${value}`}
    </Button>
  );
};

export default memo(SideButtons);
