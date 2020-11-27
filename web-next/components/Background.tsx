import React, { memo } from "react";
import { useConfig } from "../utils/configs";
import { Paimon } from "../assets";
import { chakra, Fade } from "@chakra-ui/react";

const Background = () => {
  const [background] = useConfig("paimonBg");

  return (
    <Fade in={background} unmountOnExit>
      <chakra.img
        alt="background"
        src={Paimon}
        position="fixed"
        zIndex={-10}
        opacity={0.05}
        right="-5%"
        bottom="-20%"
      />
    </Fade>
  );
};

export default memo(Background);
