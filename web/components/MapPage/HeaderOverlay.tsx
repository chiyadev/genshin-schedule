import React, { memo, useState } from "react";
import { chakra, useToken } from "@chakra-ui/react";
import Header from "../Header";
import SearchButton from "./SearchButton";

const HeaderOverlay = () => {
  const [hover, setHover] = useState(false);
  const [gray] = useToken("colors", ["gray.800"]);

  return (
    <chakra.div
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      opacity={hover ? 1 : 0.5}
      transition=".2s"
      bg={`linear-gradient(${gray} ${hover ? `100%` : "0%"}, transparent 100%)`}
      color="white"
      boxShadow={hover ? "lg" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Header menu={<SearchButton />} />
    </chakra.div>
  );
};

export default memo(HeaderOverlay);
