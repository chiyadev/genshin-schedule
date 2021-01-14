import React, { memo, ReactNode, useEffect, useMemo } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useConfig } from "../utils/configs";
import { Divider, Heading, HStack, Icon, LightMode, Link, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import { FaBullhorn } from "react-icons/fa";

const LatestChangelog = 11;

function buildChangelog() {
  return [
    <ChangelogSection key={11} date="2021/01/15">
      <ChangelogItem>Added a basic statistics page.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={10} date="2021/01/11">
      <ChangelogItem>Added username/password change support.</ChangelogItem>
      <ChangelogItem>Refactored component theme overrides.</ChangelogItem>
      <ChangelogItem>Replaced all link-themed buttons with button-themed links.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={9} date="2021/01/05">
      <ChangelogItem github={25}>Added local specialties to character common ascension materials.</ChangelogItem>
      <ChangelogItem github={25}>Added missing Blackcliff weapons.</ChangelogItem>
      <ChangelogItem>Added new task icons including NPCs, sigils and currency.</ChangelogItem>
      <ChangelogItem>Added a note input to character info page.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={8} date="2020/12/31">
      <ChangelogItem>Upgraded all dependencies to latest version.</ChangelogItem>
      <ChangelogItem>Updated the database with new items from version 1.2.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={7} date="2020/12/12">
      <ChangelogItem>Created an experimental Discord notification bot.</ChangelogItem>
      <ChangelogItem>
        Changed timestamp calculation to record absolute time regardless of server timezone. Existing schedule may be
        desynchronized for a few hours after this update deployment.
      </ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={6} date="2020/12/11">
      <ChangelogItem>Added a Klee background option.</ChangelogItem>
      <ChangelogItem>Added a friendly website tutorial for first time users.</ChangelogItem>
      <ChangelogItem>Added a shortcut to toggle task list overlay in map page.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={5} date="2020/12/09">
      <ChangelogItem>Implemented task search function.</ChangelogItem>
      <ChangelogItem>Fixed task list not being sorted by icon order.</ChangelogItem>
      <ChangelogItem>Fixed keyboard shortcuts not calling preventDefault.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={4} date="2020/12/06">
      <ChangelogItem github={19}>Fixed icons in the task list sometimes displaying the wrong icon.</ChangelogItem>
      <ChangelogItem>Fixed many bugs related to server-side rendering and timezone differences.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={3} date="2020/12/05">
      <ChangelogItem>Fixed local config not being reflected in data export window.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={2} date="2020/12/04">
      <ChangelogItem>Implemented a changelog window.</ChangelogItem>
      <ChangelogItem>Fixed a bug that caused new accounts to fail to synchronize.</ChangelogItem>
      <ChangelogItem github={21}>
        Fixed task keyboard shortcuts not working in map page when list is collapsed.
      </ChangelogItem>
      <ChangelogItem github={22}>Added keyboard shortcuts for resin subtraction buttons.</ChangelogItem>
      <ChangelogItem>Made default zoom level on task focus customizable.</ChangelogItem>
      <ChangelogItem>Added data backup/restore function.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={1} date="2020/12/03">
      <ChangelogItem github={17}>Added keyboard shortcuts for common actions.</ChangelogItem>
    </ChangelogSection>,
  ];
}

const ChangelogModal = () => {
  const [version, setVersion] = useConfig("lastChangelog");
  const changelog = useMemo(buildChangelog, []);

  useEffect(() => {
    // on init, set version to latest
    if (!version) {
      setVersion(LatestChangelog);
    }
  }, [version]);

  if (!version) {
    return null;
  }

  return (
    <LightMode>
      <Modal isOpen={version !== changelog.length} onClose={() => setVersion(changelog.length)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Icon as={FaBullhorn} />
              <div>Update changelog</div>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4} pb={2} divider={<Divider />}>
              {changelog.slice(0, 3)}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </LightMode>
  );
};

const ChangelogSection = ({ date, children }: { date?: ReactNode; children?: ReactNode }) => {
  return (
    <VStack align="start" spacing={3}>
      <Heading size="sm">{date}</Heading>
      <UnorderedList pl={4} spacing={1}>
        {children}
      </UnorderedList>
    </VStack>
  );
};

const ChangelogItem = ({ github, children }: { github?: number; children?: ReactNode }) => {
  return (
    <ListItem>
      {children}
      {!!github && (
        <Link ml={1} isExternal color="blue.500" href={`https://github.com/chiyadev/genshin-schedule/issues/${github}`}>
          #{github}
        </Link>
      )}
    </ListItem>
  );
};

export default memo(ChangelogModal);
