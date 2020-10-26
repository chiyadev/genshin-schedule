import { useMemo } from "preact/hooks";
import { DomainDropSet, DomainDropSets } from "./db/domainDropSets";
import { Domains } from "./db/domains";
import { h } from "preact";
import { memo } from "preact/compat";
import { DayOfWeek, DaysOfWeek } from "./time";

const DropLabel = ({ item }: { item: DomainDropSet["items"][0] }) => {
  const domains = useMemo(() => {
    const drops = DomainDropSets.filter(d => d.items.includes(item));
    return drops && Domains.filter(d => d.drops.some(d => drops.includes(d)));
  }, [item]);

  if (!domains.length) {
    return <span>This item does not drop from any domains.</span>;
  }

  return (
    <div>
      {domains.map(domain => {
        const days = new Set<DayOfWeek>();

        for (const drops of domain.drops) {
          if (drops.items.includes(item)) {
            for (const day of drops.days) {
              days.add(day);
            }
          }
        }

        return (
          <a key={domain.name} href={domain.wiki} className="block">
            <img
              alt="Domain"
              src="/assets/game/Domain.png"
              className="w-4 h-4 inline"
            />

            <span className="align-middle">
              <span> {domain.name}</span>

              {days.size !== 7 && (
                <span>
                  <span> on </span>
                  {DaysOfWeek.filter(d => days.has(d)).join(", ")}
                </span>
              )}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default memo(DropLabel);
