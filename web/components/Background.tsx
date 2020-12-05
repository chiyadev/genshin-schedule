import React, { memo } from "react";
import { useConfig } from "../utils/configs";
import { Paimon } from "../assets";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Background = () => {
  const [background] = useConfig("paimonBg");

  return (
    <motion.div animate={{ opacity: background ? 1 : 0 }}>
      <chakra.img
        alt="background"
        src={Paimon}
        position="fixed"
        zIndex={-10}
        opacity={0.05}
        right="-5%"
        bottom="-20%"
      />
    </motion.div>
  );
};

export default memo(Background);
