import React, { memo } from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, WebData } from "../../utils/api";
import ConfigProvider from "../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";
import ResinStats from "../../components/Statistics/ResinStats";
import TaskStats from "../../components/Statistics/TaskStats";
import InfoText from "../../components/Statistics/InfoText";

type Props = {
  data: WebData | null;
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
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const Statistics = ({ data }: Props) => {
  return (
    <ConfigProvider initial={data}>
      <Layout title={["Statistics"]}>
        <VStack align="stretch" spacing={12}>
          <InfoText />
          <ResinStats />
          <TaskStats />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Statistics);
