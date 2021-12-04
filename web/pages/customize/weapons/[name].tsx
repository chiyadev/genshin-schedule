import React, { memo } from "react";
import { createApiClient, WebData } from "../../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import MaterialDisplay from "../../../components/Customize/WeaponInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../../components/Customize/WeaponInfo/CommonMaterialDisplay";
import { Weapons, WeaponWiki } from "../../../db/weapons";
import NoteInput from "../../../components/Customize/WeaponInfo/NoteInput";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";
import { DomainOfForgery } from "../../../db/domainCategories";
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

  const weapon = Weapons.find((weapon) => weapon.name === ctx.query.name);

  if (!weapon) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      language: client.language || null,
      data: client.authenticated ? await client.getSync() : null,
      name: weapon?.name || null,
    },
  };
};

const WeaponInfo = ({ language, data, name }: Props) => {
  const weapon = Weapons.find((weapon) => weapon.name === name);

  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={[weapon?.name || "Not Found"]}>
        {weapon ? (
          <VStack align="stretch" spacing={4}>
            {!weapon.leaked ? null : <LeakedWarning />}
            <WhiteCard divide>
              <HStack spacing={4}>
                <chakra.img
                  alt={weapon.name}
                  title={weapon.name}
                  src={getAssetByName(weapon.name)}
                  w={16}
                  h={16}
                  objectFit="cover"
                />

                <div>
                  <chakra.div fontSize="xl" fontWeight="bold">
                    <Link href={weapon.wiki} isExternal>
                      <FormattedMessageId id={weapon.name} />
                    </Link>
                  </chakra.div>

                  <Badge colorScheme={DomainOfForgery.colorHint}>
                    <Link href={WeaponWiki} isExternal>
                      <FormattedMessage defaultMessage="weapon" />
                    </Link>
                  </Badge>
                </div>
              </HStack>

              <MaterialDisplay weapon={weapon} material={weapon.material} />

              {weapon.commonMaterials.map((material) => (
                <CommonMaterialDisplay key={material.name} weapon={weapon} material={material} />
              ))}

              <NoteInput weapon={weapon} />
            </WhiteCard>
          </VStack>
        ) : (
          <FormattedMessage defaultMessage="No such weapon." />
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default memo(WeaponInfo);
