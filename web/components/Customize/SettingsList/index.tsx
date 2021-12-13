import React, { memo } from "react";
import { Heading, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import BackgroundSwitch from "./BackgroundSwitch";
import SignOutButton from "./SignOutButton";
import ConfigExportButton from "./ConfigExportButton";
import TaskDefaultZoomSlider from "./TaskDefaultZoomSlider";
import AccountManageButton from "./AccountManageButton";
import { User } from "../../../utils/api";
import ThemeSwitch from "./ThemeSwitch";
import ResinNotifyMarkSlider from "./ResinNotifyMarkSlider";
import ResinEstimateModeSwitch from "./ResinEstimateModeSwitch";
import TaskListCompactSwitch from "./TaskListCompactSwitch";
import LanguageSwitch from "./LanguageSwitch";
import { FormattedMessage } from "react-intl";
import ResinCalcButtonInput from "./ResinCalcButtonInput";

const SettingsList = ({ user }: { user?: User }) => {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Settings" />
      </Heading>

      <VStack align="start" spacing={4}>
        <ThemeSwitch />
        <TaskListCompactSwitch />
        <LanguageSwitch />
        <BackgroundSwitch />
        <ResinEstimateModeSwitch />
        <ResinCalcButtonInput />
        <ResinNotifyMarkSlider />
        <TaskDefaultZoomSlider />

        <Wrap spacing={2}>
          <WrapItem>
            <ConfigExportButton />
          </WrapItem>

          {user && (
            <WrapItem>
              <AccountManageButton user={user} />
            </WrapItem>
          )}

          <WrapItem>
            <SignOutButton />
          </WrapItem>
        </Wrap>
      </VStack>
    </VStack>
  );
};

export default memo(SettingsList);
