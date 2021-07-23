import React, { memo, useMemo } from "react";
import WhiteCard from "../../WhiteCard";
import { ScheduledDomain } from "./index";
import MaterialList from "./MaterialList";
import ArtifactList from "./ArtifactList";
import { Badge, chakra, HStack, Link } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";

const DomainDisplay = ({ domain, region, category, materials, artifacts }: ScheduledDomain) => {
  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img
          alt={region.name}
          title={region.name}
          src={getAssetByName(region.name)}
          w={10}
          h={10}
          objectFit="contain"
        />

        <div>
          <chakra.div fontSize="xl" fontWeight="bold">
            <Link href={domain.wiki} isExternal>
              <FormattedMessageId id={domain.name} />
            </Link>
          </chakra.div>

          <Badge colorScheme={category.colorHint}>
            <FormattedMessage
              defaultMessage="{category}, {region}"
              values={{
                category: (
                  <Link href={category.wiki} isExternal>
                    <FormattedMessageId id={category.name} />
                  </Link>
                ),
                region: (
                  <Link href={region.wiki} isExternal>
                    <FormattedMessageId id={region.name} />
                  </Link>
                ),
              }}
            />
          </Badge>
        </div>
      </HStack>

      {useMemo(() => materials.map((group) => <MaterialList key={group.material.name} {...group} />), [materials])}
      {useMemo(() => !!artifacts.length && <ArtifactList artifacts={artifacts} />, [artifacts])}
    </WhiteCard>
  );
};

export default memo(DomainDisplay);
