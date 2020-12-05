import React, { memo, useMemo, useRef, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { trackEvent } from "../../../utils/umami";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import Subtractor from "./Subtractor";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByResin from "./EstimatorByResin";
import { Configs, useConfig } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { Resin as ResinIcon } from "../../../assets";
import { chakra, css, HStack, Input, Spacer, useTheme } from "@chakra-ui/react";
import { useMeasuredTextWidth } from "../../../utils/dom";
import { motion } from "framer-motion";

export function formatDateSimple(date: Date) {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

const estimateModes: Configs["resinEstimateMode"][] = ["time", "value"];

const Resin = () => {
  const [resin, setResin] = useConfig("resin");
  const [mode, setMode] = useConfig("resinEstimateMode");

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const resinInput = useRef<HTMLInputElement>(null);

  const date = useServerDate(60000);
  const current = useMemo(() => resin.value + getResinRecharge(date.getTime() - resin.time), [resin, date]);

  const theme = useTheme();
  const inputStyle = css({ fontSize: "xl", fontWeight: "bold" })(theme);
  const inputWidth = useMeasuredTextWidth(roundResin(current).toString(), inputStyle);

  return (
    <WidgetWrapper type="resin" heading="Resin Calculator" onHover={setHover}>
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
            cursor={focus ? undefined : "pointer"}
            value={roundResin(current).toString()}
            onClick={() => resinInput.current?.select()}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setResin({
                value: roundResin(valueAsNumber || 0),
                time: date.getTime(),
              });
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
