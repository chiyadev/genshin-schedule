import React, { memo, ReactNode } from "react";
import Head from "next/head";
import { chakra, Flex, SlideFade, Spacer } from "@chakra-ui/react";
import Footer from "./Footer";

const Layout = ({ children, title = [] }: { children?: ReactNode; title?: (string | undefined)[] }) => (
  <SlideFade in>
    <Head>
      <title>{[...title.map((x) => x?.trim()).filter((x) => x), "Genshin Schedule"].join(" · ")}</title>
    </Head>

    <Flex direction="column" w="full" minH="100vh" maxW="1200px" mx="auto">
      <chakra.div p={4}>{children}</chakra.div>
      <Spacer />
      <Footer />
    </Flex>
  </SlideFade>
);

export default memo(Layout);
