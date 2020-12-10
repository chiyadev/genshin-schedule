import React, { memo } from "react";
import { useConfig } from "../utils/configs";
import { BackgroundKlee, BackgroundPaimon } from "../assets";
import { chakra } from "@chakra-ui/react";

const Background = () => {
  const [value] = useConfig("background");

  switch (value) {
    case "paimon":
      return (
        <chakra.img src={BackgroundPaimon} position="fixed" zIndex={-10} opacity={0.05} right="-5%" bottom="-20%" />
      );

    case "klee":
      return (
        <chakra.img src={BackgroundKlee} position="fixed" zIndex={-10} opacity={0.05} right="-12%" bottom="-15%" />
      );

    case "none":
      return null;
  }
};

export default memo(Background);
