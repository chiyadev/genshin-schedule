import React, { memo, useMemo } from "react";
import { DomainDropSet, DomainDropSets } from "../db/domainDropSets";
import { Domains } from "../db/domains";
import { Weekday, Weekdays } from "../utils/time";
import { Domain } from "../assets";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";

const DropLabel = ({ item }: { item: DomainDropSet["items"][0] }) => {
  const domains = useMemo(() => {
    const drops = DomainDropSets.filter((d) => d.items.includes(item));
    return drops && Domains.filter((d) => d.drops.some((d) => drops.includes(d)));
  }, [item]);

  if (!domains.length) {
    return <div>This item does not drop from any domains.</div>;
  }

  return (
    <VStack align="start" spacing={0}>
      {domains.map((domain) => {
        const days = new Set<Weekday>();

        for (const drops of domain.drops) {
          if (drops.items.includes(item)) {
            for (const day of drops.days) {
              days.add(day);
            }
          }
        }

        return (
          <HStack key={domain.name} spacing={2}>
            <chakra.img alt="Domain" src={Domain} w={4} h={4} />

            <div>
              <Link href={domain.wiki} isExternal>
                {domain.name}
              </Link>

              {days.size !== 7 && (
                <span>
                  <span> on </span>
                  {Weekdays.filter((d) => days.has(d)).join(", ")}
                </span>
              )}
            </div>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default memo(DropLabel);
