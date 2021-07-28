import React, { memo } from "react";
import { createApiClient, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../components/ConfigProvider";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import TaskListOverlay from "../../components/MapPage/TaskListOverlay";
import HeaderOverlay from "../../components/MapPage/HeaderOverlay";
import { chakra } from "@chakra-ui/react";
import { Language } from "../../langs";

type Props = {
  language: Language | null;
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
      language: client.language || null,
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const MapCore = dynamic(() => import("../../components/Map"), { ssr: false });

const Map = ({ language, data }: Props) => {
  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={["Map"]} header={false} footer={false} background={false}>
        <HeaderOverlay />
        <TaskListOverlay />

        <chakra.div bg="gray.900">
          <MapCore
            style={{
              width: "100vw",
              height: "100vh",
            }}
          />
        </chakra.div>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Map);
