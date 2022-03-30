import React, { memo, ReactNode, useEffect, useMemo } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useConfig } from "../utils/config";
import {
  Alert,
  AlertIcon,
  Heading,
  HStack,
  Icon,
  Link,
  ListItem,
  StackDivider,
  UnorderedList,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { GitPullRequest } from "react-feather";

const LatestChangelog = 41;

function buildChangelog() {
  // To create a new changelog section, increment LatestChangelog counter by one
  // and ensure that the counter is equal to the key of the first element in this array.
  return [
    <ChangelogSection key={41} date="2022/03/30">
      <ChangelogItem github={115}>Added 2.5 and 2.6 characters, weapons and artifacts.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={40} date="2022/03/19">
      <ChangelogItem>Upgraded all dependencies to the latest versions.</ChangelogItem>
      <ChangelogItem github={113}>Added Monday-Sunday 4AM respawn options to tasks.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={39} date="2022/01/05">
      <ChangelogItem github={111}>Finalized 2.4 characters and weapons.</ChangelogItem>
      <ChangelogItem github={111}>Renamed Kujou Sara to Sara for consistency with other characters.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={38} date="2021/12/22">
      <ChangelogItem github={107}>Removed leaked warnings from Gorou, Itto, and Redhorn Stonethresher.</ChangelogItem>
      <ChangelogItem github={108}>
        Made resin and realm currency calculator buttons always show on touch-input devices.
      </ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={37} date="2021/12/13">
      <ChangelogItem github={106}>Added support for custom resin calculator buttons.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={36} date="2021/12/06">
      <ChangelogItem>Upgraded all dependencies to the latest versions.</ChangelogItem>
      <ChangelogItem github={105}>Added leaked 2.4 characters and weapon.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={35} date="2021/12/05">
      <ChangelogItem github={104}>Added 2.3 characters, weapons and artifacts.</ChangelogItem>
      <ChangelogItem github={104}>Added accuracy warning to leaked weapon pages.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={34} date="2021/11/10">
      <ChangelogItem github={100}>Added 2.1 and 2.2 characters, weapons and artifacts.</ChangelogItem>
      <ChangelogItem github={101}>Updated character images in customize page to be more consistent.</ChangelogItem>
      <ChangelogItem github={102}>Fixed Violet Court domain drops not being displayed on Sundays.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={33} date="2021/08/28">
      <ChangelogItem github={96}>Added buttons to show done tasks in task list.</ChangelogItem>
      <ChangelogItem>Added missing Amethyst Lump icon.</ChangelogItem>
      <ChangelogItem>Removed leaked character warnings from Sayu and Yoimiya.</ChangelogItem>
      <ChangelogItem>Updated localization files.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={32} date="2021/07/28">
      <ChangelogItem github={79}>
        Added support for automatic language detection based on request headers.
      </ChangelogItem>
      <ChangelogItem>Added localization support for map labels.</ChangelogItem>
      <ChangelogItem>Fixed localized item names not being searchable in Customize page.</ChangelogItem>
      <ChangelogItem>Fixed Chinese localization not being applied on database entry names.</ChangelogItem>
      <ChangelogItem>Pulled latest localization files from Weblate.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={31} date="2021/07/23">
      <Alert status="info" mb={2}>
        <AlertIcon />
        <div>
          This is a major database update. If you find any incorrect or missing information, please{" "}
          <Link color="blue.500" href="https://github.com/chiyadev/genshin-schedule/issues" isExternal>
            open an issue
          </Link>
          .
        </div>
      </Alert>
      <ChangelogItem>Upgraded all dependencies to the latest versions.</ChangelogItem>
      <ChangelogItem>Added 2.0 Inazuma characters, weapons and artifacts.</ChangelogItem>
      <ChangelogItem>Added normal boss drops and character ascension materials to the database.</ChangelogItem>
      <ChangelogItem>Added more character backgrounds.</ChangelogItem>
      <ChangelogItem>Improved many more parts of the website UI.</ChangelogItem>
      <ChangelogItem>Improved search performance in Customize page.</ChangelogItem>
      <ChangelogItem>Implemented a new algorithm to select most efficient domain runs.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={30} date="2021/07/04">
      <ChangelogItem>Added Simplified Chinese localization. 添加了简体中文翻译。</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={29} date="2021/06/15">
      <ChangelogItem>Improved some parts of the website UI.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={28} date="2021/06/13">
      <ChangelogItem github={90}>Added 1.6 characters: Kazuha, Sayu and Yoimiya.</ChangelogItem>
      <ChangelogItem github={90}>Added 1.6 weapons: Dodoco Tales, Freedom-Sworn and Mitternachts Waltz.</ChangelogItem>
      <ChangelogItem github={90}>Added accuracy warning to leaked character pages.</ChangelogItem>
      <ChangelogItem github={89}>Added missing weapon: Song of Broken Pines</ChangelogItem>
      <ChangelogItem github={88}>Fixed logout button sometimes not working on Firefox.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={27} date="2021/05/30">
      <ChangelogItem github={71}>Added more detailed estimation modes for realm currency calculator.</ChangelogItem>
      <ChangelogItem github={85}>Updated several incorrect weapon entries and added missing weapons.</ChangelogItem>
      <ChangelogItem github={83}>
        Used next.js scrollRestoration experimental flag instead of sessionStorage hack.
      </ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={26} date="2021/05/15">
      <ChangelogItem github={69}>Added Indonesian localization. Menambahkan terjemahan bahasa Indonesia.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={25} date="2021/05/15">
      <ChangelogItem github={64}>Improved translation workflow based on GNU gettext tools.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={24} date="2021/05/04">
      <ChangelogItem github={63}>Added a calculator for realm currency.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={23} date="2021/05/01">
      <ChangelogItem github={53}>Implemented full support for localization.</ChangelogItem>
      <ChangelogItem>Renamed Mt. Aozang to Mt. Aocang.</ChangelogItem>
      <ChangelogItem github={61}>Added a service worker to make the website installable as PWA.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={22} date="2021/04/30">
      <ChangelogItem>Removed text from header menu to make it minimal.</ChangelogItem>
      <ChangelogItem>Added button in task list to show hidden tasks.</ChangelogItem>
      <ChangelogItem>Added categories to icon listing.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={21} date="2021/04/28">
      <ChangelogItem>Added new character from 1.5: Yanfei</ChangelogItem>
      <ChangelogItem>Added new artifacts from 1.5: Tenacity of the Millelith, Pale Flame</ChangelogItem>
      <ChangelogItem>Added new domains from 1.5: Ridge Watch, Beneath the Dragon-Queller</ChangelogItem>
      <ChangelogItem>Added new items from 1.5: various dyes and woods, Transient Resin</ChangelogItem>
      <ChangelogItem>Added leaked character: Eula</ChangelogItem>
      <ChangelogItem>Updated Rosaria's old picture.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={20} date="2021/03/21">
      <ChangelogItem>Added new weapons from 1.4: Elegy For The End, The Alley Flash and Windblume Ode.</ChangelogItem>
      <ChangelogItem github={54}>Fixed daylight savings calculation for America and Europe servers.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={19} date="2021/03/05">
      <ChangelogItem github={50}>Added a setting for resin estimation mode by amount instead of time.</ChangelogItem>
      <ChangelogItem>Added missing weapon Memory of Dust.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={18} date="2021/03/04">
      <ChangelogItem>Updated Hu Tao; added Staff of Homa and Lithic series weapons to the database.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={17} date="2021/02/24">
      <ChangelogItem github={49}>Fixed incorrect weapon data for Royal Grimoire.</ChangelogItem>
      <ChangelogItem github={48}>Fixed respawn unit select being drawn outside bounds on Firefox.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={16} date="2021/02/16">
      <ChangelogItem github={46}>Added Parametric Transformer and Vitalized Dragontooth icons.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={15} date="2021/02/05">
      <ChangelogItem>Split domain view into two columns on large screens.</ChangelogItem>
      <ChangelogItem github={29}>Added highlighting feature to task list and domain view.</ChangelogItem>
      <ChangelogItem>Added compact display mode to task list.</ChangelogItem>
      <ChangelogItem>Improved clock offset warning.</ChangelogItem>
      <ChangelogItem>Added estimated time of notification in resin calculator.</ChangelogItem>
      <ChangelogItem>Updated Xiao; added Rosaria, Hu Tao (beta testing) and Primordial Jade Cutter.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={14} date="2021/02/03">
      <ChangelogItem>Fixed dark mode theme not being applied at the root level.</ChangelogItem>
      <ChangelogItem github={46}>Added icons for placeable gadgets.</ChangelogItem>
      <ChangelogItem github={28}>Improved reliability of Discord notification delivery.</ChangelogItem>
      <ChangelogItem>
        Graduated the Discord bot from beta testing and made it available for public invite.
      </ChangelogItem>
      <ChangelogItem github={27}>Added a slider to customize when resin notifications should send.</ChangelogItem>
      <ChangelogItem>Improved formatting of Discord notification messages.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={13} date="2021/01/29">
      <ChangelogItem>Improved website theme and added dark mode support.</ChangelogItem>
      <ChangelogItem>Refactored page paths.</ChangelogItem>
    </ChangelogSection>,
    <ChangelogSection key={12} date="2021/01/21">
      <ChangelogItem github={37}>Added talent materials dropped from weekly bosses to characters.</ChangelogItem>
      <ChangelogItem github={39}>Added character, weapon and artifact filter buttons to domain list.</ChangelogItem>
    </ChangelogSection>,
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

  const dividerColor = useColorModeValue("gray.200", "gray.600");

  if (!version) {
    return null;
  }

  return (
    <Modal isOpen={version !== changelog.length} onClose={() => setVersion(changelog.length)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Icon as={GitPullRequest} />
            <div>
              <FormattedMessage defaultMessage="Update changelog" />
            </div>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4} pb={2} divider={<StackDivider borderColor={dividerColor} />}>
            {changelog.slice(0, 5)}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ChangelogSection = ({ date, children }: { date: ReactNode; children?: ReactNode }) => {
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
        <Link
          ml={1}
          isExternal
          color={useColorModeValue("blue.500", "blue.300")}
          href={`https://github.com/chiyadev/genshin-schedule/issues/${github}`}
        >
          #{github}
        </Link>
      )}
    </ListItem>
  );
};

export default memo(ChangelogModal);
