import { StackDivider, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { memo, ReactNode } from "react";

const WhiteCard = ({ children, divide, padding = 4 }: { children?: ReactNode; divide?: boolean; padding?: number }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack
      align="stretch"
      bg={useColorModeValue("white", "gray.900")}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="md"
      p={padding}
      spacing={divide ? padding : 0}
      divider={divide ? <StackDivider borderColor={borderColor} /> : undefined}
    >
      {children}
    </VStack>
  );
};

export default memo(WhiteCard);
