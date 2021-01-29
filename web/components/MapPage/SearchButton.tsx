import React, { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import TaskSearchModal from "../TaskSearchModal";
import { useConfig } from "../../utils/configs";
import { HStack, Link } from "@chakra-ui/react";
import { trackEvent } from "../../utils/umami";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query] = useConfig("taskQuery");

  return (
    <HStack spacing={2}>
      <TaskSearchModal open={open} setOpen={setOpen} />

      <Link
        as="button"
        onClick={() => {
          setOpen(true);
          trackEvent("map", "taskSearch");
        }}
      >
        <HStack spacing={2}>
          <FaSearch />
          <div>{query ? `"${query}"` : "Search"}</div>
        </HStack>
      </Link>
    </HStack>
  );
};

export default memo(SearchButton);
