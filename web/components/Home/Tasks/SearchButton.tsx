import React, { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";
import TaskSearchModal from "../../TaskSearchModal";
import { useConfig } from "../../../utils/configs";
import { Button, HStack } from "@chakra-ui/react";
import { trackEvent } from "../../../utils/umami";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query] = useConfig("taskQuery");

  return (
    <HStack spacin={2}>
      <TaskSearchModal open={open} setOpen={setOpen} />

      {query && <div>"{query}"</div>}

      <Tooltip label="Search">
        <Button
          variant="link"
          colorScheme="white"
          minW={0}
          p={1}
          onClick={() => {
            setOpen(true);
            trackEvent("taskList", "taskSearch");
          }}
        >
          <FaSearch />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default memo(SearchButton);
