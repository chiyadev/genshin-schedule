import React, { memo, ReactNode } from "react";
import Head from "next/head";
import { chakra, Flex, Spacer } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import { motion } from "framer-motion";

const Layout = ({
  children,
  title = [],
  layout = true,
}: {
  children?: ReactNode;
  title?: (string | undefined)[];
  layout?: boolean;
}) => (
  <>
    <Head>
      <title>{[...title.map((x) => x?.trim()).filter((x) => x), "Genshin Schedule"].join(" · ")}</title>
    </Head>

    {layout ? (
      <chakra.div overflow="hidden">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Flex direction="column" minH="100vh" maxW="1200px" mx="auto">
            <Background />
            <Header />
            <chakra.div p={4}>{children}</chakra.div>
            <Spacer />
            <Footer />
          </Flex>
        </motion.div>
      </chakra.div>
    ) : (
      children
    )}
  </>
);

export default memo(Layout);
