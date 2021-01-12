import React, { memo } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { HStack, Icon, Link } from "@chakra-ui/react";

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link as="button" size="sm" onClick={onClick}>
      <HStack spacing={2}>
        <Icon as={FaAngleLeft} />
        <div>Back</div>
      </HStack>
    </Link>
  );
};

export default memo(BackButton);
