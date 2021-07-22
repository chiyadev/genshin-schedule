import {
  Button,
  chakra,
  HStack,
  Icon,
  Link,
  Spacer,
  Tooltip,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { memo } from "react";
import WhiteCard from "../../WhiteCard";
import Bot from "../../../assets/notifications/Bot.jpg";
import Privacy from "../../../assets/notifications/Privacy.jpg";
import PrivacyDM from "../../../assets/notifications/PrivacyDM.jpg";
import Success from "../../../assets/notifications/Success.jpg";
import MessageDisplay from "./MessageDisplay";
import NextLink from "next/link";
import { FormattedMessage } from "react-intl";
import { Bell, List, MessageSquare, Link as LinkIcon } from "react-feather";

export const DiscordServerInvite = "https://discord.gg/XdPQeEaBE7";
export const DiscordBotInvite =
  "https://discord.com/oauth2/authorize?client_id=786827003164098610&scope=bot&permissions=379968";

const Info = () => {
  return (
    <VStack flex={1} align="stretch" spacing={4}>
      <WhiteCard divide>
        <HStack spacing={2} fontSize="xl" fontWeight="bold">
          <Icon as={Bell} />
          <div>
            <FormattedMessage defaultMessage="Notifications" />
          </div>

          <Spacer />
          <Tooltip label={<FormattedMessage defaultMessage="Queue" />}>
            <span>
              <NextLink href="/home/notifications/queue" passHref>
                <Link color={useColorModeValue("blue.500", "blue.300")}>
                  <Icon as={List} fontSize="md" />
                </Link>
              </NextLink>
            </span>
          </Tooltip>
        </HStack>

        <VStack align="start" spacing={4}>
          <div>
            <FormattedMessage defaultMessage="Genshin Schedule has a Discord bot that can send you notifications when your resin recharges or resources respawn." />
          </div>

          <chakra.img src={Bot.src} borderRadius="md" />

          <VStack align="start" spacing={2}>
            <div>
              <FormattedMessage
                defaultMessage={
                  "1. Join the {server}, or {invite} to your server. Either method is fine because you can only interact with the bot via DM anyway, but at least one common server is required for the bot to be able to message you."
                }
                values={{
                  server: (
                    <Link href={DiscordServerInvite} color={useColorModeValue("blue.500", "blue.300")} isExternal>
                      <FormattedMessage defaultMessage="Genshin Schedule server" />
                    </Link>
                  ),
                  invite: (
                    <Link href={DiscordBotInvite} color={useColorModeValue("blue.500", "blue.300")} isExternal>
                      <FormattedMessage defaultMessage="invite the bot" />
                    </Link>
                  ),
                }}
              />
            </div>

            <Wrap>
              <WrapItem>
                <Button
                  as="a"
                  href={DiscordServerInvite}
                  target="_blank"
                  leftIcon={<Icon as={MessageSquare} />}
                  color="white"
                  bg="#7289da"
                  colorScheme="none"
                >
                  <FormattedMessage defaultMessage="Join the server" />
                </Button>
              </WrapItem>

              <WrapItem>
                <Button
                  as="a"
                  href={DiscordBotInvite}
                  target="_blank"
                  leftIcon={<Icon as={LinkIcon} />}
                  color="white"
                  bg="#7289da"
                  colorScheme="none"
                >
                  <FormattedMessage defaultMessage="Invite the bot" />
                </Button>
              </WrapItem>
            </Wrap>
          </VStack>

          <VStack align="start" spacing={2}>
            <div>
              <FormattedMessage defaultMessage="2. Make sure DMs from server members are enabled, otherwise the bot cannot message you." />
            </div>

            <chakra.img src={Privacy.src} borderRadius="md" />
            <chakra.img src={PrivacyDM.src} borderRadius="md" />
          </VStack>

          <VStack align="start" spacing={2}>
            <div>
              <FormattedMessage defaultMessage="3. Copy the following message and send it to the bot via DM. Don't share this message with anyone else, ever!" />
            </div>

            <MessageDisplay />
          </VStack>

          <chakra.img src={Success.src} borderRadius="md" />
        </VStack>
      </WhiteCard>
    </VStack>
  );
};

export default memo(Info);
