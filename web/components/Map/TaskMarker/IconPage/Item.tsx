import { AspectRatio, chakra } from "@chakra-ui/react";
import React, { memo } from "react";
import { getAssetByName } from "../../../../assets";
import { useInView } from "react-intersection-observer";

const Item = ({ name, onClick }: { name: string; onClick?: () => void }) => {
  const [ref, visible] = useInView({ triggerOnce: true });

  return (
    <AspectRatio ratio={1}>
      {visible ? (
        <chakra.img
          ref={ref}
          alt={name}
          title={name}
          src={getAssetByName(name)}
          cursor="pointer"
          style={{
            objectFit: "contain",
          }}
          onClick={onClick}
        />
      ) : (
        <div ref={ref} title={name} />
      )}
    </AspectRatio>
  );
};

export default memo(Item);
