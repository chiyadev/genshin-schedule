import React, { memo } from "react";
import { createApiClient, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigsProvider from "../../components/ConfigsProvider";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import TaskListOverlay from "../../components/MapPage/TaskListOverlay";
import HeaderOverlay from "../../components/MapPage/HeaderOverlay";

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

const MapCore = dynamic(() => import("../../components/Map"), { ssr: false });

const Index = ({ data }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout title={["Map"]} layout={false}>
        <HeaderOverlay />
        <TaskListOverlay />

        <MapCore
          style={{
            width: "100vw",
            height: "100vh",
          }}
        />
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Index);
