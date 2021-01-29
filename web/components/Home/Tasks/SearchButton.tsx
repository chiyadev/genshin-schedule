import React, { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";
import TaskSearchModal from "../../TaskSearchModal";
import { useConfig } from "../../../utils/configs";
import { Button, HStack, Icon } from "@chakra-ui/react";
import { trackEvent } from "../../../utils/umami";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query] = useConfig("taskQuery");

  return (
    <HStack spacing={2}>
      <TaskSearchModal open={open} setOpen={setOpen} />

      {query && <div>"{query}"</div>}

      <Tooltip label="Search">
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
          <Icon as={FaSearch} />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default memo(SearchButton);
