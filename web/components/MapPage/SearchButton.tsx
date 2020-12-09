import React, { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import TaskSearchModal from "../TaskSearchModal";
import { useConfig } from "../../utils/configs";
import { Button, HStack } from "@chakra-ui/react";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query] = useConfig("taskQuery");

  return (
    <HStack spacin={2}>
      <TaskSearchModal open={open} setOpen={setOpen} />

      <Button
        variant="link"
        colorScheme="white"
        leftIcon={<FaSearch />}
        minW={0}
        p={1}
        borderRadius={0}
        fontWeight="normal"
        onClick={() => setOpen(true)}
      >
        {query ? `"${query}"` : "Search"}
      </Button>
    </HStack>
  );
};

export default memo(SearchButton);
