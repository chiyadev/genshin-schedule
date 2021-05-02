import React, { memo } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link as="button" size="sm" onClick={onClick}>
      <HStack spacing={2}>
        <Icon as={FaAngleLeft} />
        <div>
          <FormattedMessage id="taskBack" />
        </div>
      </HStack>
    </Link>
  );
};

export default memo(BackButton);
