import React, { memo, useState } from "react";
import { Tooltip } from "@chakra-ui/tooltip";
import TaskSearchModal from "../../TaskSearchModal";
import { useConfig } from "../../../utils/config";
import { Button, HStack, Icon } from "@chakra-ui/react";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { Search } from "react-feather";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query] = useConfig("taskQuery");

  return (
    <HStack spacing={2}>
      <TaskSearchModal open={open} setOpen={setOpen} />

      {query && <div>"{query}"</div>}

      <Tooltip label={<FormattedMessage defaultMessage="Search" />}>
        <Button
          as="button"
          variant="ghost"
          w={8}
          h={8}
          p={1}
          minW={0}
          onClick={() => {
            setOpen(true);
            trackEvent("taskList", "taskSearch");
          }}
        >
          <Icon as={Search} />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default memo(SearchButton);
