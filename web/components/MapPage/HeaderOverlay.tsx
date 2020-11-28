import React, { memo, useState } from "react";
import { chakra } from "@chakra-ui/react";
import Header from "../Header";

const HeaderOverlay = () => {
  const [hover, setHover] = useState(false);

  return (
    <chakra.div
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      opacity={hover ? 1 : 0.5}
      transition=".2s all"
      bg={`linear-gradient(rgba(46, 49, 61, 1) ${hover ? "100" : "0"}%, rgba(255, 255, 255, 0) 100%)`}
      boxShadow={hover ? "lg" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Header />
    </chakra.div>
  );
};

export default memo(HeaderOverlay);
