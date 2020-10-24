import { h } from "preact";
import { Character, Characters } from "../../db/characters";
import { useMemo } from "preact/hooks";
import { TalentMaterial } from "../../db/talentMaterials";
import { useConfig } from "../../configs";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle, useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";

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

      <div className="py-4 flex flex-col space-y-4">
        <TalentMat material={character.talentMaterial} />
      </div>

      <div className="py-4 text-sm">
        <Toggle character={character} />
      </div>
    </WhiteCard>
  );
};

const TalentMat = ({ material }: { material: TalentMaterial }) => {
  return (
    <div className="space-y-2">
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

      <div className="pl-12 mx-2 text-sm">
        <DropLabel item={material} />
      </div>
    </div>
  );
};

const Toggle = ({ character }: { character: Character }) => {
  const [list, setList] = useConfig("characters");

  const exists = useMemo(() => list.includes(character.name), [
    list,
    character
  ]);

  return (
    <Checkbox
      value={exists}
      setValue={value => {
        setList(list => arrayToggle(list, character.name, value));
      }}
    >
      <div className="inline-block align-middle ml-2">
        <div>Show on schedule</div>

        <div className="text-xs text-gray-600">
          Scheduled domains will appear on the days they are available.
        </div>
      </div>
    </Checkbox>
  );
};

export default memo(CharacterInfo);
