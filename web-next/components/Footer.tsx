import React, { memo } from "react";
import { FaGithub, FaHeart, FaQuestion } from "react-icons/fa";
import { HStack, Icon, Link, Tooltip } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack as="footer" spacing={4} justify="center" pt={4} pb={4} textAlign="center" color="gray.500">
      <Tooltip label="GitHub">
        <Link href="https://github.com/chiyadev/nhitomi" isExternal>
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
  );
};

export default memo(Footer);
