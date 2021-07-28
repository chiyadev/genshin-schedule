import React, { memo } from "react";
import { createApiClient, WebData } from "../../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import { Artifacts, ArtifactWiki } from "../../../db/artifacts";
import NoteInput from "../../../components/Customize/ArtifactInfo/NoteInput";
import Toggle from "../../../components/Customize/ArtifactInfo/Toggle";
import DropLabel from "../../../components/DropLabel";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";
import { DomainOfBlessing } from "../../../db/domainCategories";
import { Language } from "../../../langs";

type Props = {
  language: Language | null;
  data: WebData | null;
  name: string | null;
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

  const artifact = Artifacts.find((artifact) => artifact.name === ctx.query.name);

  if (!artifact) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      language: client.language || null,
      data: client.authenticated ? await client.getSync() : null,
      name: artifact?.name || null,
    },
  };
};

const ArtifactInfo = ({ language, data, name }: Props) => {
  const artifact = Artifacts.find((artifact) => artifact.name === name);

  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={[artifact?.name || "Not Found"]}>
        {artifact ? (
          <WhiteCard divide>
            <HStack spacing={4}>
              <chakra.img
                alt={artifact.name}
                title={artifact.name}
                src={getAssetByName(artifact.name)}
                w={16}
                h={16}
                objectFit="contain"
              />

              <div>
                <chakra.div fontSize="xl" fontWeight="bold">
                  <Link href={artifact.wiki} isExternal>
                    <FormattedMessageId id={artifact.name} />
                  </Link>
                </chakra.div>

                <Badge colorScheme={DomainOfBlessing.colorHint}>
                  <Link href={ArtifactWiki} isExternal>
                    <FormattedMessage defaultMessage="artifact" />
                  </Link>
                </Badge>
              </div>
            </HStack>

            <VStack align="start" spacing={4}>
              <DropLabel item={artifact} />
              <Toggle artifact={artifact} />
            </VStack>

            <NoteInput artifact={artifact} />
          </WhiteCard>
        ) : (
          <FormattedMessage defaultMessage="No such artifact." />
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default memo(ArtifactInfo);
