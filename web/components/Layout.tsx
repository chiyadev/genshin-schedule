import React, { memo, ReactNode, useState } from "react";
import Head from "next/head";
import { chakra, Flex, HStack, Icon, Link, Spacer } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import KeyHelp from "./ShortcutHelp";
import ChangelogModal from "./ChangelogModal";
import NextLink from "next/link";
import { FaBell, FaChartBar } from "react-icons/fa";
import StatisticsUpdater from "./Statistics/StatisticsUpdater";
import ColorModeOverride from "./ColorModeOverride";

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
                      <HStack spacing={2}>
                        <Icon as={FaBell} />
                        <div>Notifications</div>
                      </HStack>
                    </Link>
                  </NextLink>
                  <NextLink href="/home/statistics" passHref>
                    <Link>
                      <HStack spacing={2}>
                        <Icon as={FaChartBar} />
                        <div>Statistics</div>
                      </HStack>
                    </Link>
                  </NextLink>
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
