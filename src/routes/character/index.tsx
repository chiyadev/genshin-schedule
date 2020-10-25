import { h } from "preact";
import { Character, Characters } from "../../db/characters";
import { useMemo } from "preact/hooks";
import { useConfig } from "../../configs";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle, useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";
import { CommonMaterial } from "../../db/commonMaterials";
import { FaPlus } from "react-icons/fa";
import { route } from "preact-router";
import { randomStr } from "../../random";
import { TalentMaterial } from "../../db/talentMaterials";

const CharacterInfo = ({ character }: { character: string }) => {
  const info = useMemo(() => Characters.find(c => c.name === character), [
    character
  ]);

  useTabTitle(info?.name);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner character={info} /> : <div>No such character.</div>}
    </div>
  );
};

const Inner = ({ character }: { character: Character }) => {
  return (
    <WhiteCard divide>
      <a href={character.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <img
            alt={character.name}
            src={`/assets/game/${character.name}.png`}
            className="w-16 h-16 rounded-full"
          />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{character.name}</div>
            <div className="text-xs text-gray-600">{character.type}</div>
          </div>
        </div>
      </a>

      <TalentMat character={character} material={character.talentMaterial} />
      <CommonMat character={character} material={character.commonMaterial} />
    </WhiteCard>
  );
};

const TalentMat = ({
  character,
  material
}: {
  character: Character;
  material: TalentMaterial;
}) => {
  const [list, setList] = useConfig("characters");

  const exists = useMemo(() => list.includes(character.name), [
    list,
    character
  ]);

  return (
    <div className="py-4 space-y-4 text-sm flex flex-col">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={material.name}
            src={`/assets/game/${material.item}.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <DropLabel item={material} />

      <Checkbox
        value={exists}
        setValue={value => {
          setList(list => arrayToggle(list, character.name, value));
        }}
      >
        <div>Show on schedule</div>

        <div className="text-xs text-gray-600">
          Scheduled domains will appear on the days they are available.
        </div>
      </Checkbox>
    </div>
  );
};

const CommonMat = ({
  character,
  material
}: {
  character: Character;
  material: CommonMaterial;
}) => {
  const [center] = useConfig("mapState");
  const [, setTask] = useConfig("mapCreateTask");

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
            setTask(task => ({
              ...task,
              id: randomStr(6),
              location: center,
              name: material.name,
              icon: material.item,
              description: `ascension material for ${character.name}`,
              visible: true
            }));

            route("/map");
          }}
        >
          <FaPlus className="inline" />

          <span className="align-middle"> Add as task</span>
        </span>
      </div>
    </div>
  );
};

export default memo(CharacterInfo);
