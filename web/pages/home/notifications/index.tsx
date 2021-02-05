import React, { memo } from "react";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, WebData } from "../../../utils/api";
import ConfigProvider from "../../../components/ConfigProvider";
import InfoContainer from "../../../components/Customize/Notifications/InfoContainer";
import DiscordWidget from "../../../components/Customize/Notifications/DiscordWidget";
import Info from "../../../components/Customize/Notifications/Info";

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

const Home = ({ data }: Props) => {
  return (
    <ConfigProvider initial={data}>
      <Layout title={["Notifications"]}>
        <InfoContainer main={<Info />} sub={<DiscordWidget />} />
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Home);
