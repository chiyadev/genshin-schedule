import React, { memo } from "react";
import { chakra, HStack, Link, useColorModeValue, useToken } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { arrayToggle } from "../../../utils";
import NextLink from "next/link";
import ItemNote from "./ItemNote";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage as FormattedMessageId, useIntl } from "react-intl";
import { Weapon } from "../../../db/weapons";
import { Character } from "../../../db/characters";
import { Artifact } from "../../../db/artifacts";

const Item = ({ name, type }: Character | Weapon | Artifact) => {
  const { formatMessage } = useIntl();
  const [highlights, setHighlights] = useConfig("itemHighlights");
  const [highlightColor] = useToken("colors", [useColorModeValue("yellow.100", "yellow.900")]);

  let path: string;

  switch (type) {
    case "Character":
      path = "characters";
      break;

    case "Weapon":
      path = "weapons";
      break;

    case "Artifact":
      path = "artifacts";
      break;
  }

  return (
    <HStack spacing={2} bg={highlights.includes(name) ? highlightColor : undefined} borderRadius="sm">
      <chakra.img
        alt={name}
        title={formatMessage({ defaultMessage: "Highlight item" })}
        src={getAssetByName(name)}
        w={6}
        h={6}
        flexShrink={0}
        objectFit="contain"
        borderRadius={type === "Character" ? "full" : undefined}
        cursor="pointer"
        onClick={() => {
          setHighlights((highlights) => arrayToggle(highlights, name));
          trackEvent("domainView", "itemHighlight");
        }}
      />

      <div>
        <NextLink href={`/customize/${path}/${name}`} passHref>
          <Link fontWeight={highlights.includes(name) ? "semibold" : undefined}>
            <FormattedMessageId id={name} />
          </Link>
        </NextLink>

        <ItemNote name={name} />
      </div>
    </HStack>
  );
};

export default memo(Item);
