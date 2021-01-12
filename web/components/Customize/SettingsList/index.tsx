import React, { memo } from "react";
import { HStack, Icon, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import BackgroundSwitch from "./BackgroundSwitch";
import SignOutButton from "./SignOutButton";
import ConfigExportButton from "./ConfigExportButton";
import TaskDefaultZoomSlider from "./TaskDefaultZoomSlider";
import ViewTutorialButton from "./ViewTutorialButton";
import AccountManageButton from "./AccountManageButton";
import { User } from "../../../utils/api";

const SettingsList = ({ user }: { user?: User }) => {
  return (
    <VStack align="stretch" spacing={4} color="white">
      <HStack fontSize="xl" fontWeight="bold" spacing={2}>
        <Icon as={FaCog} w={8} h={8} />
        <div>Settings</div>
      </HStack>

      <VStack align="start" spacing={4}>
        <BackgroundSwitch />
        <TaskDefaultZoomSlider />

        <Wrap spacing={2}>
          <WrapItem>
            <ViewTutorialButton />
          </WrapItem>
          <WrapItem>
            <ConfigExportButton />
          </WrapItem>

          {user && (
            <>
              <WrapItem>
                <AccountManageButton user={user} />
              </WrapItem>
              <WrapItem>
                <SignOutButton />
              </WrapItem>
            </>
          )}
        </Wrap>
      </VStack>
    </VStack>
  );
};

export default memo(SettingsList);
