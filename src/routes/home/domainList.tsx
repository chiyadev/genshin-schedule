import { h } from "preact";
import { css, cx } from "emotion";
import { Domain, Domains } from "../../db/domains";
import { useMemo } from "preact/hooks";
import {
  getServerDayOfWeek,
  useRerenderFrequency,
  useServerDate
} from "../../time";
import { useConfig } from "../../configs";
import { Characters } from "../../db/characters";
import { DomainDropSet } from "../../db/domainDropSets";
import { DomainCategories } from "../../db/domainCategories";

const DomainList = () => {
  const date = useServerDate();
  const dayOfWeek = getServerDayOfWeek(date);

  useRerenderFrequency(1000);

  const [characters] = useConfig("characters");

  const domains = useMemo(() => {
    const wantedDrops = new Set<DomainDropSet["items"][0]>();

    for (const charName of characters) {
      const char = Characters.find(char => char.name === charName);
      char && wantedDrops.add(char.talentMaterial);
    }

    return Domains.filter(domain =>
      domain.drops.some(drops =>
        drops.items.some(item => wantedDrops.has(item))
      )
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [characters, dayOfWeek]);

  return useMemo(
    () => (
      <div className="space-y-4 flex flex-col">
        {domains.map(domain => (
          <DomainDisplay key={domain.name} domain={domain} />
        ))}
      </div>
    ),
    [domains]
  );
};

const DomainDisplay = ({ domain }: { domain: Domain }) => {
  const category = useMemo(() => {
    return DomainCategories.find(category => category.domains.includes(domain));
  }, [domain]);

  return (
    <div
      className={cx(
        "w-full border border-white shadow-lg rounded",
        css`
          background-color: rgba(0, 0, 0, 0.1);
        `
      )}
    >
      <a href={domain.wiki}>
        <div className="w-full p-4 bg-white text-black">
          <img
            src="/assets/game/domain.png"
            className="inline mr-2 w-10 h-10 object-contain"
          />

          <div className="inline-block align-middle">
            <div className="text-lg font-bold">{domain.name}</div>
            <div className="text-xs text-gray-600">
              {category?.name} ({category?.dropDescription})
            </div>
          </div>
        </div>
      </a>

      <div className="p-4">Mona, Lisa</div>
    </div>
  );
};

export default DomainList;
