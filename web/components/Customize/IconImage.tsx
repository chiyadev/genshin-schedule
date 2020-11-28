import React, { ComponentProps, memo } from "react";
import { chakra } from "@chakra-ui/react";
import { getAssetByName } from "../../assets";
import { useInView } from "react-intersection-observer";

const IconImage = ({ name, ...props }: { name: string } & ComponentProps<typeof chakra.div>) => {
  const [ref, visible] = useInView({ triggerOnce: true });

  if (visible) {
    return <chakra.img ref={ref} alt={name} src={getAssetByName(name)} {...(props as any)} />;
  } else {
    return <chakra.div ref={ref} {...props} />;
  }
};

export default memo(IconImage);
