import React, { memo } from "react";
import { chakra, HStack, Icon, Link, Tooltip, VStack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { FormattedMessage } from "react-intl";
import { Command, GitHub, Heart, HelpCircle, MessageSquare } from "react-feather";

const Footer = ({ showShortcuts }: { showShortcuts?: () => void }) => {
  return (
    <VStack as="footer" align="stretch" spacing={4} p={4} color="gray.500" textAlign="center">
      <chakra.div fontSize="sm">
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

      <chakra.div fontSize="sm">
        <p>
          <FormattedMessage
            defaultMessage="Written by {chiya} and {contrib} on GitHub."
            values={{
              chiya: (
                <Link href="https://chiya.dev" isExternal color={useColorModeValue("pink.500", "pink.300")}>
                  chiya.dev
                </Link>
              ),
              contrib: (
                <Link
                  href="https://github.com/chiyadev/genshin-schedule/graphs/contributors"
                  isExternal
                  color={useColorModeValue("pink.500", "pink.300")}
                >
                  <FormattedMessage defaultMessage="contributors" />
                </Link>
              ),
            }}
          />
        </p>
      </chakra.div>

      <HStack spacing={4} justify="center">
        {showShortcuts && (
          <Tooltip label={<FormattedMessage defaultMessage="Shortcuts" />}>
            <Link as="button" onClick={showShortcuts}>
              <Icon as={Command} />
            </Link>
          </Tooltip>
        )}

        <Tooltip label={<FormattedMessage defaultMessage="Help" />}>
          <Link href="https://github.com/chiyadev/genshin-schedule/wiki" isExternal>
            <Icon as={HelpCircle} />
          </Link>
        </Tooltip>

        <Tooltip label={<FormattedMessage defaultMessage="Discord" />}>
          <Link href="https://discord.gg/XdPQeEaBE7" isExternal>
            <Icon as={MessageSquare} />
          </Link>
        </Tooltip>

        <Tooltip label={<FormattedMessage defaultMessage="GitHub" />}>
          <Link href="https://github.com/chiyadev/genshin-schedule" isExternal>
            <Icon as={GitHub} />
          </Link>
        </Tooltip>

        <Tooltip label="chiya.dev">
          <Link href="https://chiya.dev" isExternal>
            <Icon as={Heart} />
          </Link>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default memo(Footer);
