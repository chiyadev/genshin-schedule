import React, { memo, useRef } from "react";
import { GetServerSideProps } from "next";
import { Button, ButtonGroup, chakra, Heading, Icon, VStack } from "@chakra-ui/react";
import ConfigsProvider from "../components/ConfigsProvider";
import { createApiClient } from "../utils/api";
import Layout from "../components/Layout";
import ResinCalculator from "../assets/welcome/ResinCalculator.jpg";
import TaskScheduler from "../assets/welcome/TaskScheduler.jpg";
import DomainView from "../assets/welcome/DomainView.jpg";
import { FaGithub, FaSignInAlt } from "react-icons/fa";
import UserSignIn from "../components/Auth/UserSignIn";

type Props = {};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  if (client.token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Welcome = () => {
  const authRef = useRef<HTMLDivElement>(null);

  return (
    <ConfigsProvider>
      <Layout header={false} background={false}>
        <VStack align="stretch" spacing={32} py={32} flex={1} maxW="568px" mx="auto">
          <VStack align="stretch" spacing={4}>
            <Heading>Genshin Schedule</Heading>
            <div>
              Genshin Schedule is a website to help you keep track of time-related game activities in Genshin Impact.
            </div>
            <ButtonGroup>
              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FaSignInAlt} />}
                onClick={() => authRef.current?.scrollIntoView({ block: "start" })}
              >
                Sign in
              </Button>

              <Button
                as="a"
                leftIcon={<Icon as={FaGithub} />}
                href="https://github.com/chiyadev/genshin-schedule"
                target="_blank"
              >
                GitHub
              </Button>
            </ButtonGroup>
          </VStack>

          <VStack align="stretch" spacing={4}>
            <Heading size="lg">Features</Heading>

            <VStack align="stretch" spacing={16}>
              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">Resin calculator</Heading>
                  <chakra.div color="gray.500">
                    Tracks your resins and estimates when it will recharge without having to open the game.
                  </chakra.div>
                </VStack>

                <img src={ResinCalculator} />
              </VStack>

              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">Task scheduler</Heading>
                  <chakra.div color="gray.500">
                    Tracks open world resources and reminds you as soon as they respawn. There is no limit to the number
                    of pins.
                  </chakra.div>
                </VStack>

                <img src={TaskScheduler} />
              </VStack>

              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">Domain view</Heading>
                  <chakra.div color="gray.500">
                    Shows which domains can be cleared for ascension materials and artifacts for the day.
                  </chakra.div>
                </VStack>

                <img src={DomainView} />
              </VStack>
            </VStack>
          </VStack>

          <VStack ref={authRef} align="stretch" spacing={4}>
            <Heading size="lg">Sign in</Heading>

            <div>
              Signing in will enable synchronization across multiple devices. If you do not have an account, it will be
              created automatically.
            </div>

            <UserSignIn />
          </VStack>
        </VStack>
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Welcome);
