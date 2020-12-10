import React, { memo } from "react";
import { DarkMode, HStack, Icon, VStack } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import BackgroundSwitch from "./BackgroundSwitch";
import SignOutButton from "./SignOutButton";
import ConfigExportButton from "./ConfigExportButton";
import TaskDefaultZoomSlider from "./TaskDefaultZoomSlider";
import ViewTutorialButton from "./ViewTutorialButton";

const SettingsList = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <HStack fontSize="xl" fontWeight="bold" spacing={2} color="white">
        <Icon as={FaCog} w={8} h={8} />
        <div>Settings</div>
      </HStack>

      <DarkMode>
        <VStack align="start" spacing={4} color="white">
          <BackgroundSwitch />
          <TaskDefaultZoomSlider />

          <HStack spacing={2}>
            <ViewTutorialButton />
            <ConfigExportButton />
            <SignOutButton />
          </HStack>
        </VStack>
      </DarkMode>
    </VStack>
  );
};

export default memo(SettingsList);
