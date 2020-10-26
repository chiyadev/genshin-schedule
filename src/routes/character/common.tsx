import { Character } from "../../db/characters";
import { CommonMaterial } from "../../db/commonMaterials";
import { FaPlus } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";
import { useTaskCreator } from "../../utils";

const CommonMaterialDisplay = ({
  character,
  material
}: {
  character: Character;
  material: CommonMaterial;
}) => {
  const createTask = useTaskCreator();

  return (
    <div className="py-4 space-y-4">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={material.name}
            src={`/assets/game/${material.item}.png`}
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <div className="text-sm">
        <span
          className="cursor-pointer"
          onClick={() => {
            createTask(
              material,
              `ascension material for ${character.name}`,
              true
            );
          }}
        >
          <FaPlus className="inline" />
          <span className="align-middle"> Add as task</span>
        </span>
      </div>
    </div>
  );
};

export default memo(CommonMaterialDisplay);
