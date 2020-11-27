import React, { memo } from "react";
import { FaGithub, FaHeart, FaQuestion } from "react-icons/fa";
import { chakra, DarkMode, HStack, Icon, Link, Tooltip, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <DarkMode>
      <VStack align="stretch" spacing={2} p={4} color="gray.500">
        <chakra.div fontSize="sm" textAlign="center">
          <p>
            <NextLink href="/" passHref>
              <Link>
                <em>genshin.chiya.dev</em>
              </Link>
            </NextLink>
            <span> is not affiliated with or endorsed by </span>
            <Link href="https://mihoyo.com/" isExternal>
              <em>miHoYo</em>
            </Link>
            <span>.</span>
          </p>

          <p>Data on this website may not always be accurate or up-to-date with in-game changes.</p>
        </chakra.div>

        <HStack as="footer" spacing={4} justify="center" textAlign="center">
          <Tooltip label="GitHub">
            <Link href="https://github.com/chiyadev/genshin-schedule" isExternal>
              <Icon as={FaGithub} />
            </Link>
          </Tooltip>

          <Tooltip label="Help">
            <Link href="https://github.com/chiyadev/genshin-schedule/wiki" isExternal>
              <Icon as={FaQuestion} />
            </Link>
          </Tooltip>

          <Tooltip label="chiya.dev">
            <Link href="https://chiya.dev" isExternal>
              <Icon as={FaHeart} />
            </Link>
          </Tooltip>
        </HStack>
      </VStack>
    </DarkMode>
  );
};

export default memo(Footer);
