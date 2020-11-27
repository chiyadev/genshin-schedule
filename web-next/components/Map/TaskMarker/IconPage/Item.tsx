import { AspectRatio, chakra } from "@chakra-ui/react";
import React, { memo } from "react";
import { getAssetByName } from "../../../../assets";

const Item = ({ name, onClick }: { name: string; onClick?: () => void }) => {
  return (
    <AspectRatio ratio={1}>
      <chakra.img
        alt={name}
        src={getAssetByName(name)}
        cursor="pointer"
        h="full"
        style={{
          objectFit: "contain",
        }}
        onClick={onClick}
      />
    </AspectRatio>
  );
};

export default memo(Item);
