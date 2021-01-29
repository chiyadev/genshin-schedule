import React, { memo } from "react";
import WhiteCard from "../../WhiteCard";
import HideText from "./HideText";
import { useConfig } from "../../../utils/configs";
import Favicon180x180 from "../../../public/favicon-180x180.png";
import { chakra, HStack, Link, ListItem, UnorderedList, useColorModeValue, VStack } from "@chakra-ui/react";

const Info = () => {
  const [hidden] = useConfig("hiddenWidgets");

  if (hidden.info) {
    return null;
  }

  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img alt="Genshin Schedule" src={Favicon180x180} w={10} h={10} borderRadius="md" />

        <div>
          <chakra.div fontSize="xl" fontWeight="bold">
            Genshin Schedule
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            Website information
          </chakra.div>
        </div>
      </HStack>

      <VStack align="stretch">
        <div>
          Genshin Schedule is a website that helps you keep track of time-related game activities in Genshin Impact.
        </div>

        <UnorderedList pl={4}>
          <ListItem>
            <strong>Server Clock</strong> &mdash; Displays the current server time.
          </ListItem>

          <ListItem>
            <strong>Resin Calculator</strong> &mdash; Tracks your resins over time and estimates when it will recharge.
          </ListItem>

          <ListItem>
            <strong>Task Scheduler</strong> &mdash; Tracks open world resources and indicates when they can be collected
            again.
          </ListItem>

          <ListItem>
            <strong>Domain View</strong> &mdash; Shows which domains can be cleared today for ascension materials and
            artifacts for the day.
          </ListItem>
        </UnorderedList>

        <div>
          <span>Please refer to the </span>
          <Link
            href="https://github.com/chiyadev/genshin-schedule/wiki"
            color={useColorModeValue("blue.500", "blue.300")}
            isExternal
          >
            website guide
          </Link>
          <span> for usage help.</span>
        </div>
      </VStack>

      <div>
        <HideText />
      </div>
    </WhiteCard>
  );
};

export default memo(Info);
