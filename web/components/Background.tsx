import React, { memo } from "react";
import { useConfig } from "../utils/config";
import {
  BackgroundKlee,
  BackgroundPaimon,
  BackgroundDiluc,
  BackgroundTartaglia,
  BackgroundZhongli,
  BackgroundXiao,
  BackgroundHuTao,
  BackgroundKazuha,
  BackgroundAyaka,
} from "../assets";
import { chakra } from "@chakra-ui/react";

export const CharacterBackgrounds = {
  paimon: BackgroundPaimon.src,
  klee: BackgroundKlee.src,
  diluc: BackgroundDiluc.src,
  tartaglia: BackgroundTartaglia.src,
  zhongli: BackgroundZhongli.src,
  xiao: BackgroundXiao.src,
  hutao: BackgroundHuTao.src,
  kazuha: BackgroundKazuha.src,
  ayaka: BackgroundAyaka.src,
};

const Background = () => {
  const [value] = useConfig("background");

  if (value === "none") {
    return null;
  }

  return (
    <chakra.img
      key={value}
      src={CharacterBackgrounds[value]}
      position="fixed"
      pointerEvents="none"
      userSelect="none"
      zIndex={-10}
      opacity={0.08}
      top={0}
      right={0}
      w="full"
      h="full"
      maxW="xl"
      objectFit="contain"
      objectPosition="100% 100%"
    />
  );
};

export default memo(Background);
