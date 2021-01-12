import React, { memo, ReactNode, useState } from "react";
import Head from "next/head";
import { chakra, DarkMode, Flex, HStack, Icon, Link, Spacer } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import { motion } from "framer-motion";
import KeyHelp from "./ShortcutHelp";
import ChangelogModal from "./ChangelogModal";
import TutorialModal from "./TutorialModal";
import NextLink from "next/link";
import { FaBell } from "react-icons/fa";

const Layout = ({
  children,
  title = [],
  layout = true,
}: {
  children?: ReactNode;
  title?: (string | undefined)[];
  layout?: boolean;
}) => {
  const [shortcuts, setShortcuts] = useState(false);

  return (
    <DarkMode>
      <Head>
        <title>{[...title.map((x) => x?.trim()).filter((x) => x), "Genshin Schedule"].join(" · ")}</title>
      </Head>

      <KeyHelp open={shortcuts} setOpen={setShortcuts} />
      <TutorialModal />
      <ChangelogModal />

      {layout ? (
        <chakra.div overflow="hidden">
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Flex direction="column" minH="100vh" maxW="1200px" mx="auto">
              <Background />
              <Header
                menu={
                  <NextLink href="/customize/notifications" passHref>
                    <Link>
                      <HStack spacing={2}>
                        <Icon as={FaBell} />
                        <div>Notifications</div>
                      </HStack>
                    </Link>
                  </NextLink>
                }
              />
              <chakra.div p={4}>{children}</chakra.div>
              <Spacer />
              <Footer showShortcuts={() => setShortcuts(true)} />
            </Flex>
          </motion.div>
        </chakra.div>
      ) : (
        children
      )}
    </DarkMode>
  );
};

export default memo(Layout);
