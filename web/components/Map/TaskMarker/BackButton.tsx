import React, { memo } from "react";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { ChevronLeft } from "react-feather";

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link as="button" size="sm" onClick={onClick}>
      <HStack spacing={2}>
        <Icon as={ChevronLeft} />
        <div>
          <FormattedMessage defaultMessage="Back" />
        </div>
      </HStack>
    </Link>
  );
};

export default memo(BackButton);
