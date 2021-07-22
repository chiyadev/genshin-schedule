import React, { memo, ReactNode } from "react";
import Favicon32x32 from "../public/favicon-32x32.png";
import { chakra, HStack, Icon, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { Tooltip } from "@chakra-ui/tooltip";
import { FormattedMessage } from "react-intl";
import { Settings } from "react-feather";

const Header = ({ menu }: { menu?: ReactNode }) => {
  return (
    <HStack as="nav" p={4} spacing={2}>
      <NextLink href="/home" passHref>
        <Link fontFamily="Genshin" fontWeight="bold" flexShrink={0}>
          <HStack spacing={2}>
            <chakra.img alt="logo" src={Favicon32x32.src} w={6} h={6} borderRadius="md" />
            <chakra.span fontSize="lg">
              <FormattedMessage defaultMessage="Genshin Schedule" />
            </chakra.span>
          </HStack>
        </Link>
      </NextLink>

      <Spacer />

      <HStack spacing={4}>
        {menu}

        <NextLink href="/customize" passHref>
          <Link flexShrink={0}>
            <Tooltip label={<FormattedMessage defaultMessage="Customize" />}>
              <span>
                <Icon as={Settings} />
              </span>
            </Tooltip>
          </Link>
        </NextLink>
      </HStack>
    </HStack>
  );
};

export default memo(Header);
