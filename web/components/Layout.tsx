import React, { memo, ReactNode, useState } from "react";
import Head from "next/head";
import { chakra, Flex, Icon, Link, Spacer } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import KeyHelp from "./ShortcutHelp";
import ChangelogModal from "./ChangelogModal";
import NextLink from "next/link";
import StatisticsUpdater from "./Statistics/StatisticsUpdater";
import ColorModeOverride from "./ColorModeOverride";
import ClockOffsetWarning from "./ClockOffsetWarning";
import { Tooltip } from "@chakra-ui/tooltip";
import { FormattedMessage } from "react-intl";
import { Bell, HelpCircle, PieChart } from "react-feather";

const Layout = ({
  children,
  title = [],
  header = true,
  footer = true,
  background = true,
}: {
  children?: ReactNode;
  title?: (string | undefined)[];
  header?: boolean;
  footer?: boolean;
  background?: boolean;
}) => {
  const [shortcuts, setShortcuts] = useState(false);

  return (
    <ColorModeOverride>
      <Head>
        <title>{[...title.map((x) => x?.trim()).filter((x) => x), "Genshin Schedule"].join(" · ")}</title>
      </Head>

      <KeyHelp open={shortcuts} setOpen={setShortcuts} />
      <ClockOffsetWarning />
      <ChangelogModal />
      <StatisticsUpdater />

      {background && <Background />}

      {header || footer ? (
        <Flex direction="column" minH="100vh" maxW="1200px" mx="auto">
          {header && (
            <Header
              menu={
                <>
                  <NextLink href="/home/notifications" passHref>
                    <Link>
                      <Tooltip label={<FormattedMessage defaultMessage="Notifications" />}>
                        <span>
                          <Icon as={Bell} />
                        </span>
                      </Tooltip>
                    </Link>
                  </NextLink>

                  <NextLink href="/home/statistics" passHref>
                    <Link>
                      <Tooltip label={<FormattedMessage defaultMessage="Statistics" />}>
                        <span>
                          <Icon as={PieChart} />
                        </span>
                      </Tooltip>
                    </Link>
                  </NextLink>

                  <Tooltip label={<FormattedMessage defaultMessage="Help" />}>
                    <Link href="https://github.com/chiyadev/genshin-schedule/wiki" isExternal>
                      <Icon as={HelpCircle} />
                    </Link>
                  </Tooltip>
                </>
              }
            />
          )}

          <chakra.div p={4}>{children}</chakra.div>
          <Spacer />

          {footer && <Footer showShortcuts={() => setShortcuts(true)} />}
        </Flex>
      ) : (
        children
      )}
    </ColorModeOverride>
  );
};

export default memo(Layout);
