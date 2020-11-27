import React, { memo } from "react";
import { createApiClient, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigsProvider from "../../components/ConfigsProvider";
import Layout from "../../components/Layout";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../components/WhiteCard";
import { getAssetByName } from "../../assets";
import { Artifacts, ArtifactWiki } from "../../db/artifacts";
import NoteInput from "../../components/Customize/ArtifactInfo/NoteInput";
import Toggle from "../../components/Customize/ArtifactInfo/Toggle";
import DropLabel from "../../components/DropLabel";

type Props = {
  data: WebData | null;
  name: string | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);
  const artifact = Artifacts.find((artifact) => artifact.name === ctx.query.name);

  if (!artifact) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
      name: artifact?.name || null,
    },
  };
};

const ArtifactInfo = ({ data, name }: Props) => {
  const artifact = Artifacts.find((artifact) => artifact.name === name);

  return (
    <ConfigsProvider initial={data}>
      <Layout title={[artifact?.name || "Not Found"]}>
        {artifact ? (
          <WhiteCard divide>
            <HStack spacing={2}>
              <chakra.img alt={artifact.name} src={getAssetByName(artifact.name)} w={16} h={16} borderRadius="full" />

              <div>
                <chakra.div fontSize="xl" fontWeight="bold">
                  <Link href={artifact.wiki} isExternal>
                    {artifact.name}
                  </Link>
                </chakra.div>
                <chakra.div fontSize="sm" color="gray.500">
                  <Link href={ArtifactWiki} isExternal>
                    {artifact.type}
                  </Link>
                </chakra.div>
              </div>
            </HStack>

            <VStack align="start" spacing={4}>
              <DropLabel item={artifact} />
              <Toggle artifact={artifact} />
            </VStack>

            <NoteInput artifact={artifact} />
          </WhiteCard>
        ) : (
          <chakra.div color="white">No such artifact.</chakra.div>
        )}
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(ArtifactInfo);
