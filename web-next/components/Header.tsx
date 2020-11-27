import React, { memo } from "react";
import Favicon32x32 from "../public/favicon-32x32.png";
import { chakra, HStack, Icon, Link, Spacer } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import NextLink from "next/link";

const Header = () => {
  return (
    <HStack as="nav" p={4} spacing={4} color="white">
      <NextLink href="/" passHref>
        <Link fontWeight="bold" flexShrink={0}>
          <chakra.img alt="logo" src={Favicon32x32} w={6} h={6} borderRadius="md" d="inline" mr={2} />
          <chakra.span fontSize="lg" verticalAlign="middle">
            Genshin Schedule
          </chakra.span>
        </Link>
      </NextLink>

      <Spacer />

      <NextLink href="/customize" passHref>
        <Link flexShrink={0}>
          <Icon as={FaCog} mr={1} />
          <span>Customize</span>
        </Link>
      </NextLink>
    </HStack>
  );
};

export default memo(Header);
