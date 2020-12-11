import { Button, chakra, HStack, Icon, Link, Tag, VStack } from "@chakra-ui/react";
import React, { memo } from "react";
import WhiteCard from "../../WhiteCard";
import { FaBell, FaDiscord } from "react-icons/fa";
import Bot from "../../../assets/notifications/Bot.jpg";
import Privacy from "../../../assets/notifications/Privacy.png";
import PrivacyDM from "../../../assets/notifications/PrivacyDM.png";
import MessageDisplay from "./MessageDisplay";

const Info = () => {
  return (
    <VStack flex={1} align="stretch" spacing={4}>
      <WhiteCard divide>
        <HStack spacing={2} fontSize="xl" fontWeight="bold">
          <Icon as={FaBell} />
          <div>Notifications</div>
          <Tag colorScheme="green">Experimental</Tag>
        </HStack>

        <VStack align="start" spacing={4}>
          <div>
            Genshin Schedule has an experimental Discord bot that can send you notifications when your resin recharges
            or resources respawn.
          </div>

          <chakra.img src={Bot} borderRadius="md" boxShadow="md" />

          <VStack align="start" spacing={2}>
            <div>
              1. Join our Discord server!{" "}
              <Link href="https://discord.gg/XdPQeEaBE7" color="blue.500" isExternal>
                discord.gg/XdPQeEaBE7
              </Link>
            </div>

            <Button
              as={Link}
              href="https://discord.gg/XdPQeEaBE7"
              isExternal
              leftIcon={<Icon as={FaDiscord} />}
              color="white"
              bg="#7289da"
              colorScheme="none"
              boxShadow="md"
            >
              Join the Discord
            </Button>
          </VStack>

          <VStack align="start" spacing={2}>
            <div>
              2. Make sure DMs from server members are enabled, otherwise the bot will not be able to message you.
            </div>

            <chakra.img src={Privacy} borderRadius="md" boxShadow="md" />
            <chakra.img src={PrivacyDM} borderRadius="md" boxShadow="md" />
          </VStack>

          <VStack align="start" spacing={2}>
            <div>
              3. Copy the following message and send it to the bot via DM. Don't share this message with anyone else,
              ever!
            </div>
            <MessageDisplay />
          </VStack>

          <div>4. Done! Future notifications will be sent to you via DM.</div>
        </VStack>
      </WhiteCard>
    </VStack>
  );
};

export default memo(Info);
