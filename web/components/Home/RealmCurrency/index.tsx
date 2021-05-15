import React, { memo, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge } from "../../../db/realms";
import { useConfig } from "../../../utils/config";
import { RealmCurrency as RealmCurrencyIcon } from "../../../assets";
import { chakra, VStack, HStack, Spacer } from "@chakra-ui/react";
import EnergyInput from "./EnergyInput";
import TrustRankInput from "./TrustRankInput";
import CurrencyInput from "./CurrencyInput";
import Estimator from "./Estimator";
import { motion } from "framer-motion";
import ClearButton from "./ClearButton";
import { FormattedUnit, useServerTime } from "../../../utils/time";
import { FormattedMessage } from "react-intl";

const RealmCurrency = () => {
  const [currency] = useConfig("realmCurrency");
  const [rank] = useConfig("realmRank");
  const [energy] = useConfig("realmEnergy");

  const [hover, setHover] = useState(false);

  const time = useServerTime(60000);
  const current = currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time);

  return (
    <WidgetWrapper
      type="realm"
      heading={<FormattedMessage defaultMessage="Realm currency calculator" />}
      onHover={setHover}
    >
      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img alt="Realm Currency" src={RealmCurrencyIcon} w={10} h={10} transform="scale(1.2)" />
          <chakra.div fontSize="md">
            <FormattedMessage defaultMessage="Adeptal energy" />:
          </chakra.div>

          <EnergyInput />

          <chakra.div flexShrink={0} fontSize="sm" color="gray.500">
            {getCurrencyRate(energy)} / <FormattedUnit id="unit.hour" />
          </chakra.div>

          <Spacer />
          <motion.div animate={{ opacity: hover ? 1 : 0 }}>{current > 0 && <ClearButton />}</motion.div>
        </HStack>

        <VStack align="stretch" spacing={2} pl={12}>
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
              / {getCurrencyCap(rank)}
            </chakra.div>
          </HStack>

          <Estimator />
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(RealmCurrency);
