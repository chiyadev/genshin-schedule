import React, { memo } from "react";
import { Character } from "../../../db/characters";
import { CommonMaterial, CommonMaterialWiki } from "../../../db/commonMaterials";
import { FaPlus } from "react-icons/fa";
import { Button, chakra, HStack, Icon, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { useTaskCreator } from "../../../utils/tasks";

const CommonMaterialDisplay = ({ character, material }: { character: Character; material: CommonMaterial }) => {
  const createTask = useTaskCreator();

  return (
    <VStack align="start" spacing={4}>
      <HStack>
        <chakra.img alt={material.item} src={getAssetByName(material.item)} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              {material.name}
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <Link href={CommonMaterialWiki} isExternal>
              {material.type}
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <Button
        size="sm"
        leftIcon={<Icon as={FaPlus} />}
        onClick={async () => {
          await createTask(material, `ascension material for ${character.name}`);
        }}
      >
        Add as task
      </Button>
    </VStack>
  );
};

export default memo(CommonMaterialDisplay);
