import React, { memo, ReactNode } from "react";
import Head from "next/head";
import { chakra, Flex, SlideFade, Spacer } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";

const Layout = ({
  children,
  title = [],
  layout = true,
}: {
  children?: ReactNode;
  title?: (string | undefined)[];
  layout?: boolean;
}) => (
  <SlideFade in unmountOnExit>
    <Head>
      <title>{[...title.map((x) => x?.trim()).filter((x) => x), "Genshin Schedule"].join(" · ")}</title>
    </Head>

    {layout ? (
      <Flex direction="column" w="full" minH="100vh" maxW="1200px" mx="auto">
        <Background />
        <Header />
        <chakra.div p={4}>{children}</chakra.div>
        <Spacer />
        <Footer />
      </Flex>
    ) : (
      children
    )}
  </SlideFade>
);

export default memo(Layout);
