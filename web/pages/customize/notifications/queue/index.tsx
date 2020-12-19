import React, { memo } from "react";
import Layout from "../../../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, Notification, WebData } from "../../../../utils/api";
import ConfigsProvider from "../../../../components/ConfigsProvider";
import { VStack } from "@chakra-ui/layout";
import WhiteCard from "../../../../components/WhiteCard";
import { Button, chakra, HStack } from "@chakra-ui/react";
import { DateTime } from "luxon";

type Props = {
  data: WebData | null;
  queue: Notification[] | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
      queue: client.authenticated ? await client.listNotifications() : null,
    },
  };
};

const Home = ({ data, queue }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout title={["Notification Queue"]}>
        <VStack align="stretch" spacing={4}>
          <chakra.div color="white">Notification queue:</chakra.div>

          {queue?.length ? (
            queue
              .sort((a, b) => a.time - b.time)
              .map((notification) => (
                <WhiteCard key={notification.key} divide>
                  <HStack spacing={4}>
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
                    <chakra.div>
                      Scheduled at {DateTime.fromMillis(notification.time).toSQL()} (Browser time)
                    </chakra.div>

                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        onClick={async () => {
                          await createApiClient().setNotification({
                            ...notification,
                            time: DateTime.utc().valueOf(),
                          });
                        }}
                      >
                        Send now
                      </Button>

                      <Button
                        size="sm"
                        onClick={async () => {
                          await createApiClient().deleteNotification(notification.key);
                        }}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </WhiteCard>
              ))
          ) : (
            <chakra.div color="white">There are no notifications in queue.</chakra.div>
          )}
        </VStack>
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Home);
