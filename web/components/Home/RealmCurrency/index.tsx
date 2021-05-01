import React, { memo, useRef, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { getCurrencyRecharge, clampEnergy, clampRank, getCurrencyCap, clampCurrency, getCurrencyRate } from "../../../db/realms";
import { useConfig } from "../../../utils/config";
import { SereniteaPot as SereniteaPotIcon } from "../../../assets";
import {
  chakra,
  css,
  VStack,
  HStack,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { useServerTime } from "../../../utils/time";

const RealmCurrency = () => {
  const [realmEnergy, setRealmEnergy] = useConfig("realmEnergy");
  const [realmRank, setRealmRank] = useConfig("realmRank");
  const [realmCurrency, setRealmCurrency] = useConfig("realmCurrency");

  const [energyFocus, setEnergyFocus] = useState(false);
  const realmEnergyInput = useRef<HTMLInputElement>(null);
  const [rankFocus, setRankFocus] = useState(false);
  const realmRankInput = useRef<HTMLInputElement>(null);
  const [currencyFocus, setCurrencyFocus] = useState(false);
  const realmCurrencyInput = useRef<HTMLInputElement>(null);

  const time = useServerTime(60000);
  const current = realmCurrency.value + getCurrencyRecharge(realmEnergy, time.valueOf() - realmCurrency.time);

  const theme = useTheme();
  const inputStyle: any = css({ fontSize: "lg", fontWeight: "bold", width: 70 })(theme);

  return (
    <WidgetWrapper type="realm" heading="Realm Currency Calculator">
      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img
            alt="Serenitea Pot"
            src={SereniteaPotIcon}
            w={10}
            h={10}
          />
          <chakra.div fontSize="md">Adeptal Energy:</chakra.div>
          <Input
            ref={realmEnergyInput}
            type="number"
            variant="unstyled"
            css={inputStyle}
            transition={undefined}
            min={0}
            borderRadius={0}
            cursor={energyFocus ? undefined : "pointer"}
            value={realmEnergy.toString()}
            onClick={() => {
              realmEnergyInput.current?.select();
            }}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setRealmEnergy(clampEnergy(valueAsNumber || 0));
            }}
            onFocus={() => setEnergyFocus(true)}
            onBlur={() => setEnergyFocus(false)}
          />
        </HStack>
        <VStack
          align="stretch"
          spacing={2}
          pl={12}
        >
          <HStack spacing={2}>
            <chakra.div fontSize="md">Trust Rank:</chakra.div>
            <Input
              ref={realmRankInput}
              type="number"
              variant="unstyled"
              css={inputStyle}
              transition={undefined}
              min={1}
              max={10}
              borderRadius={0}
              cursor={rankFocus ? undefined : "pointer"}
              value={realmRank.toString()}
              onClick={() => {
                realmRankInput.current?.select();
              }}
              onChange={({ currentTarget: { valueAsNumber } }) => {
                setRealmRank(clampRank(valueAsNumber || 0));
              }}
              onFocus={() => setRankFocus(true)}
              onBlur={() => setRankFocus(false)}
            />
          </HStack>
          <HStack spacing={2}>
            <chakra.div fontSize="md">Realm Currency:</chakra.div>
            <Input
              ref={realmCurrencyInput}
              type="number"
              variant="unstyled"
              textAlign="center"
              css={inputStyle}
              transition={undefined}
              min={0}
              max={getCurrencyCap(realmRank)}
              borderRadius={0}
              cursor={currencyFocus ? undefined : "pointer"}
              value={current.toString()}
              onClick={() => {
                realmCurrencyInput.current?.select();
              }}
              onChange={({ currentTarget: { valueAsNumber } }) => {
                setRealmCurrency({
                  value: clampCurrency(realmRank, valueAsNumber || 0),
                  time: time.valueOf(),
                });
              }}
              onFocus={() => setCurrencyFocus(true)}
              onBlur={() => setCurrencyFocus(false)}
            />

            <chakra.div flexShrink={0} fontSize="lg">
              / {getCurrencyCap(realmRank)}
            </chakra.div>
          </HStack>
          <chakra.div color="gray.500" fontSize="sm">Accumulation Rate: {getCurrencyRate(realmEnergy)}/hr</chakra.div>
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(RealmCurrency);
