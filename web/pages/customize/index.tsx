import React, { memo } from "react";
import { createApiClient, User, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigsProvider from "../../components/ConfigsProvider";
import Layout from "../../components/Layout";
import Search from "../../components/Customize/Search";
import { VStack } from "@chakra-ui/react";
import CharacterList from "../../components/Customize/CharacterList";
import WeaponList from "../../components/Customize/WeaponList";
import ArtifactList from "../../components/Customize/ArtifactList";
import SettingsList from "../../components/Customize/SettingsList";

type Props = {
  user: User | null;
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
      user: client.authenticated ? await client.getSelf() : null,
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const Customize = ({ user, data }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout title={["Customize"]}>
        <VStack align="stretch" spacing={8}>
          <Search />
          <CharacterList />
          <WeaponList />
          <ArtifactList />
          <SettingsList user={user || undefined} />
        </VStack>
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Customize);
