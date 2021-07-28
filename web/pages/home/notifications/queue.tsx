import React, { memo, useState } from "react";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, Notification, WebData } from "../../../utils/api";
import ConfigProvider from "../../../components/ConfigProvider";
import { VStack } from "@chakra-ui/layout";
import WhiteCard from "../../../components/WhiteCard";
import { Button, chakra, Code, HStack, Icon } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useFormatDuration } from "../../../utils/time";
import { FormattedMessage } from "react-intl";
import { Send } from "react-feather";
import { Language } from "../../../langs";

type Props = {
  language: Language | null;
  data: WebData | null;
  queue: Notification[] | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  if (!client.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      language: client.language || null,
      data: client.authenticated ? await client.getSync() : null,
      queue: client.authenticated ? await client.listNotifications() : null,
    },
  };
};

const Home = ({ language, data, queue }: Props) => {
  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={["Notification queue"]}>
        <VStack align="stretch" spacing={4}>
          <div>
            <FormattedMessage defaultMessage="Notification queue" />:
          </div>

          {queue?.length ? (
            queue
              .sort((a, b) => a.time - b.time)
              .map((notification) => <Item key={notification.key} notification={notification} />)
          ) : (
            <div>
              <FormattedMessage defaultMessage="There are no notifications in queue." />
            </div>
          )}
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

const Item = ({ notification }: { notification: Notification }) => {
  const [send, setSend] = useState(false);
  const [dequeue, setDequeue] = useState(false);

  const time = DateTime.fromMillis(notification.time);

  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img src={notification.icon} w={10} h={10} />
        <VStack align="start" spacing={0}>
          <chakra.div fontSize="lg">{notification.title}</chakra.div>

          {notification.description && (
            <chakra.div fontSize="sm" color="gray.500">
              {notification.description}
            </chakra.div>
          )}
        </VStack>
      </HStack>

      <VStack align="start" spacing={4}>
        <VStack align="start">
          <div>
            <FormattedMessage
              defaultMessage="Scheduled at {time} in {duration}."
              values={{ time: <Code>{time.toSQL()}</Code>, duration: <Code>{useFormatDuration(time.diffNow())}</Code> }}
            />
          </div>
        </VStack>

        <HStack spacing={2}>
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<Icon as={Send} />}
            isLoading={send}
            onClick={async () => {
              setSend(true);

              try {
                await createApiClient().setNotification({
                  ...notification,
                  time: DateTime.utc().valueOf(),
                });
              } finally {
                setSend(false);
              }
            }}
          >
            <FormattedMessage defaultMessage="Send now" />
          </Button>

          <Button
            size="sm"
            isLoading={dequeue}
            onClick={async () => {
              setDequeue(true);

              try {
                await createApiClient().deleteNotification(notification.key);
              } finally {
                setDequeue(false);
              }
            }}
          >
            <FormattedMessage defaultMessage="Dequeue" />
          </Button>
        </HStack>
      </VStack>
    </WhiteCard>
  );
};

export default memo(Home);
