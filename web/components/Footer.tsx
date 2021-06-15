import React, { memo } from "react";
import { FaDiscord, FaGithub, FaHeart, FaKeyboard, FaQuestion } from "react-icons/fa";
import { chakra, HStack, Icon, Link, Divider, Tooltip, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { FormattedMessage } from "react-intl";

const Footer = ({ showShortcuts }: { showShortcuts?: () => void }) => {
  return (
    <VStack as="footer" align="stretch" spacing={4} p={4} color="gray.500">
      <Divider />

      <chakra.div fontSize="sm" textAlign="center">
        <p>
          <FormattedMessage
            defaultMessage="{app} is not affiliated with or endorsed by {mihoyo}."
            values={{
              app: (
                <NextLink href="/" passHref>
                  <Link>
                    <em>genshin.chiya.dev</em>
                  </Link>
                </NextLink>
              ),
              mihoyo: (
                <Link href="https://mihoyo.com/" isExternal>
                  <em>
                    <FormattedMessage defaultMessage="miHoYo" />
                  </em>
                </Link>
              ),
            }}
          />
        </p>

        <p>
          <FormattedMessage defaultMessage="Data on this website may not always be accurate or up-to-date with in-game changes." />
        </p>
      </chakra.div>

      <HStack spacing={4} justify="center">
        {showShortcuts && (
          <Tooltip label={<FormattedMessage defaultMessage="Shortcuts" />}>
            <Link as="button" onClick={showShortcuts}>
              <Icon as={FaKeyboard} />
            </Link>
          </Tooltip>
        )}

        <Tooltip label={<FormattedMessage defaultMessage="Help" />}>
          <Link href="https://github.com/chiyadev/genshin-schedule/wiki" isExternal>
            <Icon as={FaQuestion} />
          </Link>
        </Tooltip>

        <Tooltip label={<FormattedMessage defaultMessage="Discord" />}>
          <Link href="https://discord.gg/XdPQeEaBE7" isExternal>
            <Icon as={FaDiscord} />
          </Link>
        </Tooltip>

        <Tooltip label={<FormattedMessage defaultMessage="GitHub" />}>
          <Link href="https://github.com/chiyadev/genshin-schedule" isExternal>
            <Icon as={FaGithub} />
          </Link>
        </Tooltip>

        <Tooltip label="chiya.dev">
          <Link href="https://chiya.dev" isExternal>
            <Icon as={FaHeart} />
          </Link>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default memo(Footer);
