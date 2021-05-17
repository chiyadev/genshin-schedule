import React, { memo } from "react";
import { chakra, HStack, Link, useColorModeValue, useToken } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { arrayToggle } from "../../../utils";
import NextLink from "next/link";
import ItemNote from "./ItemNote";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const Item = ({ path, name }: { path: "characters" | "weapons" | "artifacts"; name: string }) => {
  const [highlights, setHighlights] = useConfig("itemHighlights");
  const [highlightColor] = useToken("colors", [useColorModeValue("yellow.100", "yellow.900")]);

  return (
    <HStack key={name} spacing={2} bg={highlights.includes(name) ? highlightColor : undefined} borderRadius="sm">
      <chakra.img
        alt={name}
        src={getAssetByName(name)}
        w={6}
        h={6}
        flexShrink={0}
        objectFit="contain"
        borderRadius={path === "characters" ? "full" : undefined}
        cursor="pointer"
        onClick={() => {
          setHighlights((highlights) => arrayToggle(highlights, name));
          trackEvent("domainView", "itemHighlight");
        }}
      />

      <div>
        <NextLink href={`/customize/${path}/${name}`} passHref>
          <Link>
            <FormattedMessageId id={name} />
          </Link>
        </NextLink>

        <ItemNote name={name} />
      </div>
    </HStack>
  );
};

export default memo(Item);
