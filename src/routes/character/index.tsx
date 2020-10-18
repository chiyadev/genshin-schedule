import { h } from "preact";
import { Character, Characters } from "../../db/characters";
import { useMemo } from "preact/hooks";
import { TalentMaterial } from "../../db/talentMaterials";
import { DayOfWeek, DaysOfWeek, DomainDropSets } from "../../db/domainDropSets";
import { Domains } from "../../db/domains";
import { useConfig } from "../../configs";

const CharacterInfo = ({ character }: { character: string }) => {
  const info = useMemo(() => Characters.find(c => c.name === character), [
    character
  ]);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner character={info} /> : <div>No such character.</div>}
    </div>
  );
};

const Inner = ({ character }: { character: Character }) => {
  return (
    <div className="bg-white text-black rounded px-4 flex flex-col divide-y divide-gray-300">
      <a href={character.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <img
            className="w-16 h-16 rounded-full"
            src={`/assets/characters/Character_${character.name}_Thumb.png`}
          />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{character.name}</div>
            <div className="text-xs text-gray-600">Character information</div>
          </div>
        </div>
      </a>

      <div className="py-4 flex flex-col space-y-4">
        <TalentMat material={character.talentMaterial} />
      </div>

      <div className="py-4 text-sm">
        <Toggle character={character} />
      </div>
    </div>
  );
};

const TalentMat = ({ material }: { material: TalentMaterial }) => {
  const domain = useMemo(() => {
    const drops = DomainDropSets.find(d => d.items.includes(material));
    return drops && Domains.find(d => d.drops.includes(drops));
  }, [material]);

  const dropDays = useMemo(() => {
    const days = new Set<DayOfWeek>();

    if (domain) {
      for (const drops of domain.drops) {
        if (drops.items.includes(material)) {
          for (const day of drops.days) {
            days.add(day);
          }
        }
      }
    }

    return DaysOfWeek.filter(d => days.has(d));
  }, [domain, material]);

  return (
    <div className="space-y-2">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            src={`/assets/talents/Item_Teachings_of__${material.name}_.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      {domain && (
        <div className="pl-12 mx-2 text-sm">
          <span className="align-middle">Dropped from </span>

          <a href={domain.wiki}>
            <img src="/assets/game/domain.png" className="w-4 h-4 inline" />

            <span className="align-middle"> {domain.name}</span>
          </a>

          <span className="align-middle"> on {dropDays.join(", ")}</span>
        </div>
      )}
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
    <label>
      <input
        type="checkbox"
        checked={exists}
        onChange={({ currentTarget: { checked } }) => {
          if (checked) {
            setList(
              [...list, character.name].filter((v, i, a) => a.indexOf(v) === i)
            );
          } else {
            setList(list.filter(c => c !== character.name));
          }
        }}
      />

      <span> Show on schedule</span>
    </label>
  );
};

export default CharacterInfo;
