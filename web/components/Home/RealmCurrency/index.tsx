import React, { memo } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { getCurrencyCap, getCurrencyRate } from "../../../db/realms";
import { useConfig } from "../../../utils/config";
import { RealmCurrency as RealmCurrencyIcon } from "../../../assets";
import { chakra, VStack, HStack } from "@chakra-ui/react";
import EnergyInput from "./EnergyInput";
import TrustRankInput from "./TrustRankInput";
import CurrencyInput from "./CurrencyInput";

const RealmCurrency = () => {
  const [realmEnergy] = useConfig("realmEnergy");
  const [realmRank] = useConfig("realmRank");

  return (
    <WidgetWrapper type="realm" heading="Realm currency calculator">
      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img alt="Realm Currency" src={RealmCurrencyIcon} w={10} h={10} transform="scale(1.2)" />
          <chakra.div fontSize="md">Adeptal energy:</chakra.div>
          <EnergyInput />
        </HStack>

        <VStack align="stretch" spacing={2} pl={12}>
          <HStack spacing={2}>
            <chakra.div fontSize="md">Trust rank:</chakra.div>
            <TrustRankInput />
          </HStack>

          <HStack spacing={2}>
            <chakra.div fontSize="md">Realm currency:</chakra.div>
            <CurrencyInput />

            <chakra.div flexShrink={0} fontSize="sm" color="gray.500">
              / {getCurrencyCap(realmRank)}
            </chakra.div>
          </HStack>

          <chakra.div color="gray.500" fontSize="sm">
            Accumulation rate: {getCurrencyRate(realmEnergy)}/hr
          </chakra.div>
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(RealmCurrency);
