import React, { memo } from "react";
import { createApiClient, WebData } from "../../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Characters, CharacterWiki } from "../../../db/characters";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import MaterialDisplay from "../../../components/Customize/CharacterInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../../components/Customize/CharacterInfo/CommonMaterialDisplay";
import NoteInput from "../../../components/Customize/CharacterInfo/NoteInput";
import { FormattedMessage } from "react-intl";
import { DomainOfMastery } from "../../../db/domainCategories";
import { Language } from "../../../langs";
import LeakedWarning from "../../../components/Customize/LeakedWarning";

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

  const character = Characters.find((character) => character.name === ctx.query.name);

  if (!character) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      language: client.language || null,
      data: client.authenticated ? await client.getSync() : null,
      name: character?.name || null,
    },
  };
};

const CharacterInfo = ({ language, data, name }: Props) => {
  const character = Characters.find((character) => character.name === name);

  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={[character?.name || "Not Found"]}>
        {character ? (
          <VStack align="stretch" spacing={4}>
            {!character.leaked ? null : <LeakedWarning />}

            <WhiteCard divide>
              <HStack spacing={4}>
                <chakra.img
                  alt={character.name}
                  title={character.name}
                  src={getAssetByName(character.name)}
                  w={16}
                  h={16}
                  borderRadius="full"
                />

                <div>
                  <chakra.div fontSize="xl" fontWeight="bold">
                    <Link href={character.wiki} isExternal>
                      <FormattedMessage id={character.name} />
                    </Link>
                  </chakra.div>

                  <Badge colorScheme={DomainOfMastery.colorHint}>
                    <Link href={CharacterWiki} isExternal>
                      <FormattedMessage defaultMessage="character" />
                    </Link>
                  </Badge>
                </div>
              </HStack>

              {character.materials[0] && (
                <MaterialDisplay character={character} material={character.materials[0]} listName="charactersGem" />
              )}

              {character.materials[1] && (
                <MaterialDisplay
                  character={character}
                  material={character.materials[1]}
                  listName="charactersNormalBoss"
                />
              )}

              <MaterialDisplay character={character} material={character.talentMaterial} listName="characters" />

              <MaterialDisplay
                character={character}
                material={character.talentMaterialWeekly}
                listName="charactersWeekly"
              />

              {character.commonMaterials.map((material) => (
                <CommonMaterialDisplay key={material.name} character={character} material={material} />
              ))}

              <NoteInput character={character} />
            </WhiteCard>
          </VStack>
        ) : (
          <FormattedMessage defaultMessage="No such character." />
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default memo(CharacterInfo);
