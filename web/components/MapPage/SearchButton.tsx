import React, { memo, useState } from "react";
import TaskSearchModal from "../TaskSearchModal";
import { useConfig } from "../../utils/config";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { trackEvent } from "../../utils/umami";
import { FormattedMessage } from "react-intl";
import { Search } from "react-feather";

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
          <Icon as={Search} />
          <div>{query ? `"${query}"` : <FormattedMessage defaultMessage="Search" />}</div>
        </HStack>
      </Link>
    </HStack>
  );
};

export default memo(SearchButton);
