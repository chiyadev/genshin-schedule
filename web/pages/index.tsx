import React, { memo, useRef } from "react";
import { GetServerSideProps } from "next";
import { Button, ButtonGroup, chakra, Heading, Icon, VStack } from "@chakra-ui/react";
import ConfigProvider from "../components/ConfigProvider";
import { createApiClient } from "../utils/api";
import Layout from "../components/Layout";
import ResinCalculator from "../assets/welcome/ResinCalculator.jpg";
import TaskScheduler from "../assets/welcome/TaskScheduler.jpg";
import DomainView from "../assets/welcome/DomainView.jpg";
import { FaGithub, FaSignInAlt } from "react-icons/fa";
import UserSignIn from "../components/Auth/UserSignIn";
import Favicon180x180 from "../public/favicon-180x180.png";
import { FormattedMessage } from "react-intl";

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
    <ConfigProvider>
      <Layout header={false}>
        <VStack align="stretch" spacing={32} py={32} flex={1} maxW="568px" mx="auto">
          <VStack align="stretch" spacing={8}>
            <div>
              <chakra.img w={20} src={Favicon180x180} borderRadius="md" />
            </div>

            <VStack align="stretch" spacing={4}>
              <Heading>
                <FormattedMessage id="app" />
              </Heading>
              <div>
                <FormattedMessage id="appDesc" />
              </div>
            </VStack>

            <ButtonGroup>
              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FaSignInAlt} />}
                onClick={() => authRef.current?.scrollIntoView({ block: "start" })}
              >
                <FormattedMessage id="signIn" />
              </Button>

              <Button
                as="a"
                leftIcon={<Icon as={FaGithub} />}
                href="https://github.com/chiyadev/genshin-schedule"
                target="_blank"
              >
                <FormattedMessage id="github" />
              </Button>
            </ButtonGroup>
          </VStack>

          <VStack align="stretch" spacing={4}>
            <Heading size="lg">Features</Heading>

            <VStack align="stretch" spacing={16}>
              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">
                    <FormattedMessage id="resinCalc" />
                  </Heading>
                  <chakra.div color="gray.500">
                    <FormattedMessage id="resinCalcDesc" />
                  </chakra.div>
                </VStack>

                <img src={ResinCalculator} />
              </VStack>

              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">
                    <FormattedMessage id="taskSchd" />
                  </Heading>
                  <chakra.div color="gray.500">
                    <FormattedMessage id="taskSchdDesc" />
                  </chakra.div>
                </VStack>

                <img src={TaskScheduler} />
              </VStack>

              <VStack align="stretch" spacing={8}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md">
                    <FormattedMessage id="domainView" />
                  </Heading>
                  <chakra.div color="gray.500">
                    <FormattedMessage id="domainViewDesc" />
                  </chakra.div>
                </VStack>

                <img src={DomainView} />
              </VStack>
            </VStack>
          </VStack>

          <VStack ref={authRef} align="stretch" spacing={4}>
            <Heading size="lg">
              <FormattedMessage id="signIn" />
            </Heading>
            <div>
              <FormattedMessage id="signInHelp" />
            </div>

            <UserSignIn />
          </VStack>
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Welcome);
