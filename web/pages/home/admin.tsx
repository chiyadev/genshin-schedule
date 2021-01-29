import React, { memo } from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, User, WebData } from "../../utils/api";
import ConfigsProvider from "../../components/ConfigsProvider";
import { VStack, Wrap, WrapItem } from "@chakra-ui/react";
import DirectSignInButton from "../../components/Admin/DirectSignInButton";

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

const Admin = ({ user, data }: Props) => {
  return (
    <ConfigsProvider initial={data}>
      <Layout title={["Admin Tools"]}>
        <VStack align="stretch" spacing={4}>
          <div>Administrator tools:</div>

          {user?.isAdmin ? (
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
