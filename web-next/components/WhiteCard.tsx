import { LightMode, StackDivider, VStack } from "@chakra-ui/react";
import React, { memo, ReactNode } from "react";

const WhiteCard = ({ children, divide }: { children?: ReactNode; divide?: boolean }) => {
  return (
    <LightMode>
      <VStack
        align="stretch"
        bg="white"
        color="black"
        borderRadius="md"
        boxShadow="lg"
        p={4}
        spacing={divide ? 4 : 0}
        divider={divide ? <StackDivider borderColor="gray.200" /> : undefined}
      >
        {children}
      </VStack>
    </LightMode>
  );
};

export default memo(WhiteCard);
