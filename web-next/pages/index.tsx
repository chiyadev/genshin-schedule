import React, { memo } from "react";
import DomainList from "../components/Home/DomainView";
import TaskList from "../components/Home/Tasks";
import Info from "../components/Home/Info";
import Resin from "../components/Home/Resin";
import Clock from "../components/Home/Clock";
import Sync from "../components/Home/Sync";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, WebData } from "../utils/api";
import ConfigProvider from "../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";

type Props = {
  data: WebData | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const Home = ({ data }: Props) => {
  return (
    <ConfigProvider initial={data}>
      <Layout>
        <VStack align="stretch" spacing={12}>
          <Clock />
          <Info />
          <Sync />
          <Resin />
          <TaskList />
          <DomainList />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Home);
