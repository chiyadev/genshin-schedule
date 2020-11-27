import React, { memo } from "react";
import WhiteCard from "../../WhiteCard";
import { WiCloud } from "react-icons/wi";
import Content from "./Content";
import { chakra, HStack, Icon } from "@chakra-ui/react";
import { useSync } from "../../../utils/configs";

const Sync = () => {
  const { enabled } = useSync();

  if (enabled) {
    return null;
  }

  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <Icon as={WiCloud} w={10} h={10} />

        <div>
          <chakra.div fontSize="lg" fontWeight="bold">
            Sign in
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            Start synchronizing data across devices
          </chakra.div>
        </div>
      </HStack>

      <Content />
    </WhiteCard>
  );
};

export default memo(Sync);
