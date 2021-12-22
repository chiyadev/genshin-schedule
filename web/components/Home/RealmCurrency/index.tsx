import React, { memo, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge } from "../../../db/realms";
import { Config, useConfig } from "../../../utils/config";
import { RealmCurrency as RealmCurrencyIcon } from "../../../assets";
import { chakra, VStack, HStack, Spacer, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import ClearButton from "./ClearButton";
import CurrencyInput from "./CurrencyInput";
import EnergyInput from "./EnergyInput";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByCurrency from "./EstimatorByCurrency";
import TrustRankInput from "./TrustRankInput";
import { FormattedUnit, useServerTime } from "../../../utils/time";
import { trackEvent } from "../../../utils/umami";

const estimateModes: Config["resinEstimateMode"][] = ["time", "value"];

const RealmCurrency = () => {
  const { formatMessage } = useIntl();
  const [currency] = useConfig("realmCurrency");
  const [rank] = useConfig("realmRank");
  const [energy] = useConfig("realmEnergy");
  const [mode, setMode] = useConfig("resinEstimateMode");
  const [hover, setHover] = useState(false);
  const [isTouchDevice] = useMediaQuery("(any-pointer: coarse)");

  const time = useServerTime(60000);
  const current = currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time);
  const cap = getCurrencyCap(rank);

  return (
    <WidgetWrapper
      type="realm"
      heading={<FormattedMessage defaultMessage="Realm Currency Calculator" />}
      onHover={setHover}
    >
      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img
            alt="Realm Currency"
            title={formatMessage({ defaultMessage: "Switch estimation mode" })}
            src={RealmCurrencyIcon.src}
            cursor={current < cap ? "pointer" : undefined}
            onClick={() => {
              if (current >= cap) {
                return;
              }

              setMode((mode) => {
                return estimateModes[(estimateModes.indexOf(mode) + 1) % estimateModes.length];
              });

              trackEvent("resin", "estimateSwitch");
            }}
            w={10}
            h={10}
            transform="scale(1.2)"
          />

          <chakra.div fontSize="md">
            <FormattedMessage defaultMessage="Adeptal energy" />:
          </chakra.div>

          <EnergyInput />

          <chakra.div flexShrink={0} fontSize="sm" color="gray.500">
            {getCurrencyRate(energy)} / <FormattedUnit id="unit.hour" />
          </chakra.div>

          <Spacer />
          <motion.div animate={{ opacity: hover || isTouchDevice ? 1 : 0 }}>
            {current > 0 && <ClearButton />}
          </motion.div>
        </HStack>

        <VStack align="start" spacing={2} pl={12}>
          <HStack spacing={2}>
            <chakra.div fontSize="md">
              <FormattedMessage defaultMessage="Trust rank" />:
            </chakra.div>
            <TrustRankInput />
          </HStack>

          <HStack spacing={2}>
            <chakra.div fontSize="md">
              <FormattedMessage defaultMessage="Realm currency" />:
            </chakra.div>

            <CurrencyInput />

            <chakra.div flexShrink={0} fontSize="sm" color="gray.500">
              / {cap}
            </chakra.div>
          </HStack>

          <chakra.div color="gray.500" fontSize="sm">
            {current >= getCurrencyCap(rank) ? (
              <chakra.span bg={useColorModeValue("yellow.100", "yellow.900")}>
                <FormattedMessage defaultMessage="Your realm currency is full." />
              </chakra.span>
            ) : mode === "time" ? (
              <EstimatorByTime />
            ) : mode === "value" ? (
              <EstimatorByCurrency />
            ) : null}
          </chakra.div>
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(RealmCurrency);
