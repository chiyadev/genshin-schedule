import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { DefaultConfig, Task, useSync } from "../../../../utils/config";
import { PopupPage } from "../index";
import IntervalPicker from "./IntervalPicker";
import DueText from "./DueText";
import HideCheck from "./HideCheck";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { getAssetByName } from "../../../../assets";
import IntervalResetCheck from "./IntervalResetCheck";
import { KnownResourceTimers } from "../../../../db/icons";
import NotifyToggle from "./NotifyToggle";
import { FormattedMessage, useIntl } from "react-intl";

const InfoPage = ({
  task,
  setTask,
  setPage,
  showDue,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
  showDue?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [nameFocus, setNameFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);
  const { enabled: syncEnabled } = useSync();

  return (
    <VStack align="stretch" spacing={1}>
      <HStack spacing={2}>
        <chakra.img
          alt={task.icon}
          title={formatMessage({ defaultMessage: "Change icon" })}
          src={getAssetByName(task.icon)}
          w={8}
          h={8}
          cursor="pointer"
          objectFit="contain"
          onClick={() => setPage("icon")}
        />

        <Input
          value={task.name}
          onChange={({ currentTarget: { value } }) => {
            setTask((task) => ({ ...task, name: value }));
          }}
          flex={1}
          fontSize="lg"
          fontWeight="bold"
          variant={nameFocus ? "outline" : "unstyled"}
          p={1}
          h={8}
          placeholder={task.icon}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
      </HStack>

      <Textarea
        value={task.description || ""}
        onChange={({ currentTarget: { value } }) => {
          setTask((task) => ({ ...task, description: value }));
        }}
        color="gray.500"
        resize="none"
        variant={descFocus ? "outline" : "unstyled"}
        p={1}
        h={12}
        placeholder={formatMessage({ defaultMessage: "Task description" })}
        onFocus={() => setDescFocus(true)}
        onBlur={() => setDescFocus(false)}
      />

      <VStack key={task.icon} align="stretch" spacing={0}>
        <Accordion allowToggle>
          <AccordionItem borderWidth="0 !important">
            <AccordionButton fontSize="sm" px={0} py={1}>
              <HStack spacing={1} flex={1} textAlign="left">
                <AccordionIcon w={4} />
                <div>
                  <FormattedMessage defaultMessage="Options" />
                </div>
              </HStack>
            </AccordionButton>

            <AccordionPanel p={0} mb={1}>
              <VStack align="stretch" spacing={1}>
                {typeof task.refreshTime !== "number" ? (
                  <IntervalResetCheck
                    value={task.refreshTime}
                    setValue={() => {
                      setTask((task) => {
                        const timer = KnownResourceTimers[task.icon];

                        return {
                          ...task,
                          refreshTime: typeof timer === "number" ? timer : DefaultConfig.mapCreateTask.refreshTime,
                        };
                      });
                    }}
                  />
                ) : (
                  <IntervalPicker
                    value={task.refreshTime}
                    setValue={(value) => {
                      setTask((task) => ({ ...task, refreshTime: value }));
                    }}
                  />
                )}

                {showDue && (
                  <>
                    <HideCheck
                      value={!task.visible}
                      setValue={(v) => {
                        setTask((task) => ({ ...task, visible: !v }));
                      }}
                    />

                    {syncEnabled && (
                      <NotifyToggle
                        task={task}
                        value={task.notify || false}
                        setValue={(value) => {
                          setTask((task) => ({ ...task, notify: value }));
                        }}
                      />
                    )}
                  </>
                )}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {showDue && <DueText task={task} />}
      </VStack>
    </VStack>
  );
};

export default memo(InfoPage);
