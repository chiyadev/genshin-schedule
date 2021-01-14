import React, { memo, useRef, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { trackEvent } from "../../../utils/umami";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import Subtractor from "./Subtractor";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByResin from "./EstimatorByResin";
import { Configs, useConfig, useCurrentStats } from "../../../utils/configs";
import { Resin as ResinIcon } from "../../../assets";
import { chakra, css, HStack, Input, Spacer, useTheme } from "@chakra-ui/react";
import { useMeasuredTextWidth } from "../../../utils/dom";
import { motion } from "framer-motion";
import { useServerTime } from "../../../utils/time";
import NotificationSetter from "./NotificationSetter";

const estimateModes: Configs["resinEstimateMode"][] = ["time", "value"];

const Resin = () => {
  const [resin, setResin] = useConfig("resin");
  const [, setStats] = useCurrentStats();
  const [mode, setMode] = useConfig("resinEstimateMode");

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const resinInput = useRef<HTMLInputElement>(null);

  const time = useServerTime(60000);
  const current = resin.value + getResinRecharge(time.valueOf() - resin.time);

  const theme = useTheme();
  const inputStyle = css({ fontSize: "xl", fontWeight: "bold" })(theme);
  const inputWidth = useMeasuredTextWidth(roundResin(current).toString(), inputStyle);

  return (
    <WidgetWrapper type="resin" heading="Resin Calculator" onHover={setHover}>
      <NotificationSetter />

      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img
            alt="Resin"
            src={ResinIcon}
            w={10}
            h={10}
            cursor="pointer"
            onClick={() => {
              setMode((mode) => {
                return estimateModes[(estimateModes.indexOf(mode) + 1) % estimateModes.length];
              });

              trackEvent("resin", "estimateSwitch");
            }}
          />

          <Input
            ref={resinInput}
            type="number"
            variant="unstyled"
            style={{ width: inputWidth }}
            css={inputStyle}
            transition={undefined}
            min={0}
            max={ResinCap}
            borderRadius={0}
            cursor={focus ? undefined : "pointer"}
            value={roundResin(current).toString()}
            onClick={() => {
              resinInput.current?.select();
              trackEvent("resin", "edit");
            }}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              const oldValue = roundResin(current);
              const newValue = roundResin(valueAsNumber || 0);

              setResin({
                value: newValue,
                time: time.valueOf(),
              });

              setStats(
                (stats) => stats && { ...stats, resinsSpent: roundResin(stats.resinsSpent - newValue + oldValue) }
              );
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />

          <chakra.div flexShrink={0} fontSize="lg">
            / {ResinCap}
          </chakra.div>
          <Spacer />

          <motion.div animate={{ opacity: hover ? 1 : 0 }}>
            <Subtractor current={current} />
          </motion.div>
        </HStack>

        <chakra.div color="gray.500" pl={12} fontSize="sm">
          {current >= ResinCap ? (
            <span>Your resins are full!</span>
          ) : mode === "time" ? (
            <EstimatorByTime />
          ) : mode === "value" ? (
            <EstimatorByResin />
          ) : null}
        </chakra.div>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(Resin);
