import React, { memo, useRef, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { trackEvent } from "../../../utils/umami";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import Subtractor from "./Subtractor";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByResin from "./EstimatorByResin";
import { Config, useConfig, useCurrentStats } from "../../../utils/config";
import { Resin as ResinIcon } from "../../../assets";
import {
  chakra,
  css,
  HStack,
  Input,
  Spacer,
  StackDivider,
  useColorModeValue,
  useTheme,
  VStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { useMeasuredTextWidth } from "../../../utils/dom";
import { motion } from "framer-motion";
import { useServerTime } from "../../../utils/time";
import NotificationSetter from "./NotificationSetter";
import EstimatorByNotifyMark from "./EstimatorByNotifyMark";
import { FaBell } from "react-icons/fa";
import NextLink from "next/link";

const estimateModes: Config["resinEstimateMode"][] = ["time", "value"];

const Resin = () => {
  const [resin, setResin] = useConfig("resin");
  const [, setStats] = useCurrentStats();
  const [mode, setMode] = useConfig("resinEstimateMode");
  const [notifyMark] = useConfig("resinNotifyMark");

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const resinInput = useRef<HTMLInputElement>(null);

  const time = useServerTime(60000);
  const current = resin.value + getResinRecharge(time.valueOf() - resin.time);

  const theme = useTheme();
  const inputStyle: any = css({ fontSize: "xl", fontWeight: "bold" })(theme);
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
            transform="scale(1.4)"
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
            textAlign="center"
            style={{ width: (inputWidth || 0) + (focus ? 5 : 0) }}
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

        <VStack
          align="stretch"
          spacing={2}
          color="gray.500"
          pl={12}
          fontSize="sm"
          divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
        >
          {current >= ResinCap ? (
            <span>Your resins are full!</span>
          ) : mode === "time" ? (
            <EstimatorByTime />
          ) : mode === "value" ? (
            <EstimatorByResin />
          ) : null}

          {notifyMark !== ResinCap && current < notifyMark && (
            <HStack spacing={1} ml={-4}>
              <Icon as={FaBell} w={3} fontSize="xs" />

              <NextLink href="/home/notifications/queue" passHref>
                <Link>
                  <EstimatorByNotifyMark />
                </Link>
              </NextLink>
            </HStack>
          )}
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(Resin);
