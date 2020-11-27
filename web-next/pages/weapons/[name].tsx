import React, { memo } from "react";
import { createApiClient, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigsProvider from "../../components/ConfigsProvider";
import Layout from "../../components/Layout";
import { chakra, HStack, Link } from "@chakra-ui/react";
import WhiteCard from "../../components/WhiteCard";
import { getAssetByName } from "../../assets";
import MaterialDisplay from "../../components/Customize/WeaponInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../components/Customize/WeaponInfo/CommonMaterialDisplay";
import { Weapons, WeaponWiki } from "../../db/weapons";
import NoteInput from "../../components/Customize/WeaponInfo/NoteInput";

type Props = {
  data: WebData | null;
  name: string | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);
  const weapon = Weapons.find((weapon) => weapon.name === ctx.query.name);

  if (!weapon) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
      name: weapon?.name || null,
    },
  };
};

const WeaponInfo = ({ data, name }: Props) => {
  const weapon = Weapons.find((weapon) => weapon.name === name);

  return (
    <ConfigsProvider initial={data}>
      <Layout title={[weapon?.name || "Not Found"]}>
        {weapon ? (
          <WhiteCard divide>
            <HStack spacing={2}>
              <chakra.img alt={weapon.name} src={getAssetByName(weapon.name)} w={16} h={16} objectFit="cover" />

              <div>
                <chakra.div fontSize="xl" fontWeight="bold">
                  <Link href={weapon.wiki} isExternal>
                    {weapon.name}
                  </Link>
                </chakra.div>
                <chakra.div fontSize="sm" color="gray.500">
                  <Link href={WeaponWiki} isExternal>
                    {weapon.type}
                  </Link>
                </chakra.div>
              </div>
            </HStack>

            <MaterialDisplay weapon={weapon} material={weapon.material} />

            {weapon.commonMaterials.map((material) => (
              <CommonMaterialDisplay key={material.name} weapon={weapon} material={material} />
            ))}

            <NoteInput weapon={weapon} />
          </WhiteCard>
        ) : (
          <chakra.div color="white">No such weapon.</chakra.div>
        )}
      </Layout>
    </ConfigsProvider>
  );
};

export default memo(WeaponInfo);
