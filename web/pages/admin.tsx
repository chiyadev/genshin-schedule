import React, { memo } from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, User, WebData } from "../utils/api";
import ConfigsProvider from "../components/ConfigsProvider";
import { VStack, Wrap, WrapItem } from "@chakra-ui/react";
import DirectSignInButton from "../components/Admin/DirectSignInButton";

type Props = {
  user: User;
  data: WebData;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  return {
    props: {
      user: await client.getSelf(),
      data: await client.getSync(),
    },
  };
};

const Admin = ({ user, data }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout>
        <VStack align="stretch" spacing={4} color="white">
          <div>Administrator tools:</div>

          {user.isAdmin ? (
            <Wrap spacing={2}>
              <WrapItem>
                <DirectSignInButton />
              </WrapItem>
            </Wrap>
          ) : (
            <div>You do not have permission to view this page.</div>
          )}
        </VStack>
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(Admin);
