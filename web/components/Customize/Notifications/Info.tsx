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
import { FaBell, FaDiscord, FaLink, FaListUl } from "react-icons/fa";
import Bot from "../../../assets/notifications/Bot.jpg";
import Privacy from "../../../assets/notifications/Privacy.jpg";
import PrivacyDM from "../../../assets/notifications/PrivacyDM.jpg";
import Success from "../../../assets/notifications/Success.jpg";
import MessageDisplay from "./MessageDisplay";
import NextLink from "next/link";
import { FormattedMessage } from "react-intl";

export const DiscordServerInvite = "https://discord.gg/XdPQeEaBE7";
export const DiscordBotInvite =
  "https://discord.com/oauth2/authorize?client_id=786827003164098610&scope=bot&permissions=379968";

const Info = () => {
  return (
    <VStack flex={1} align="stretch" spacing={4}>
      <WhiteCard divide>
        <HStack spacing={2} fontSize="xl" fontWeight="bold">
          <Icon as={FaBell} />
          <div>Notifications</div>

          <Spacer />
          <Tooltip label="Queue">
            <span>
              <NextLink href="/home/notifications/queue" passHref>
                <Link color={useColorModeValue("blue.500", "blue.300")}>
                  <Icon as={FaListUl} fontSize="md" />
                </Link>
              </NextLink>
            </span>
          </Tooltip>
        </HStack>

        <VStack align="start" spacing={4}>
          <div>
            <FormattedMessage id="notiDesc" />
          </div>

          <chakra.img src={Bot} borderRadius="md" />

          <VStack align="start" spacing={2}>
            <div>
              <span>
                1. Join the{" "}
                <Link href={DiscordServerInvite} color={useColorModeValue("blue.500", "blue.300")}>
                  Genshin Schedule
                </Link>{" "}
                server, or{" "}
                <Link href={DiscordBotInvite} color={useColorModeValue("blue.500", "blue.300")}>
                  invite the bot
                </Link>{" "}
                to your server. Either method is fine because you can only interact with the bot via DM anyway, but at
                least one common server is required for the bot to be able to message you.
              </span>
            </div>

            <Wrap>
              <WrapItem>
                <Button
                  as="a"
                  href={DiscordServerInvite}
                  target="_blank"
                  leftIcon={<Icon as={FaDiscord} />}
                  color="white"
                  bg="#7289da"
                  colorScheme="none"
                >
                  Join the server
                </Button>
              </WrapItem>

              <WrapItem>
                <Button
                  as="a"
                  href={DiscordBotInvite}
                  target="_blank"
                  leftIcon={<Icon as={FaLink} />}
                  color="white"
                  bg="#7289da"
                  colorScheme="none"
                >
                  Invite the bot
                </Button>
              </WrapItem>
            </Wrap>
          </VStack>

          <VStack align="start" spacing={2}>
            <div>2. Make sure DMs from server members are enabled, otherwise the bot cannot message you.</div>

            <chakra.img src={Privacy} borderRadius="md" />
            <chakra.img src={PrivacyDM} borderRadius="md" />
          </VStack>

          <VStack align="start" spacing={2}>
            <div>
              3. Copy the following message and send it to the bot via DM. Don't share this message with anyone else,
              ever!
            </div>
            <MessageDisplay />
          </VStack>

          <VStack align="start" spacing={2}>
            <div>4. Done! Future notifications will be sent to you via DM.</div>
            <chakra.img src={Success} borderRadius="md" />
          </VStack>
        </VStack>
      </WhiteCard>
    </VStack>
  );
};

export default memo(Info);
