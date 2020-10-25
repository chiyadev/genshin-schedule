import { useMemo } from "preact/hooks";
import {
  DayOfWeek,
  DaysOfWeek,
  DomainDropSet,
  DomainDropSets
} from "./db/domainDropSets";
import { Domains } from "./db/domains";
import { h } from "preact";
import { memo } from "preact/compat";

const DropLabel = ({ item }: { item: DomainDropSet["items"][0] }) => {
  const domain = useMemo(() => {
    const drops = DomainDropSets.find(d => d.items.includes(item));
    return drops && Domains.find(d => d.drops.includes(drops));
  }, [item]);

  const dropDays = useMemo(() => {
    const days = new Set<DayOfWeek>();

    if (domain) {
      for (const drops of domain.drops) {
        if (drops.items.includes(item)) {
          for (const day of drops.days) {
            days.add(day);
          }
        }
      }
    }

    return DaysOfWeek.filter(d => days.has(d));
  }, [domain, item]);

  if (!domain) {
    return <span>This item does not drop from any domains.</span>;
  }

  return (
    <span>
      <a href={domain.wiki}>
        <img
          alt="Domain"
          src="/assets/game/Domain.png"
          className="w-4 h-4 inline"
        />

        <span className="align-middle"> {domain.name}</span>
      </a>

      {dropDays.length !== 7 && (
        <span className="align-middle"> on {dropDays.join(", ")}</span>
      )}
    </span>
  );
};

export default memo(DropLabel);
