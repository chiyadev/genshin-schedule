import React, { memo } from "react";
import { createApiClient, WebData } from "../../utils/api";
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

const Customize = ({ data }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout title={["Customize"]}>
        <VStack align="stretch" spacing={8}>
          <Search />
          <CharacterList />
          <WeaponList />
          <ArtifactList />
          <SettingsList />
        </VStack>
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Customize);
