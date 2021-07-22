import React, { memo, useMemo } from "react";
import { DomainDropSet, DomainDropSets } from "../db/domainDropSets";
import { Domains } from "../db/domains";
import { FormattedUnit, Weekday, Weekdays } from "../utils/time";
import { Domain } from "../assets";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";

const DropLabel = ({ item }: { item: DomainDropSet["items"][0] }) => {
  const domains = useMemo(() => {
    const drops = DomainDropSets.filter((d) => d.items.includes(item));
    return drops && Domains.filter((d) => d.drops.some((d) => drops.includes(d)));
  }, [item]);

  if (!domains.length) {
    return (
      <div>
        <FormattedMessage defaultMessage="This item does not drop from any domains." />
      </div>
    );
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
            <chakra.img alt="Domain" src={Domain.src} w={4} h={4} />

            <div>
              <FormattedMessage
                defaultMessage="{domain}{days, select, undefined {} other { on {days}}}"
                values={{
                  domain: (
                    <Link href={domain.wiki} isExternal>
                      <FormattedMessageId id={domain.name} />
                    </Link>
                  ),
                  days:
                    days.size === 7
                      ? undefined
                      : Weekdays.filter((d) => days.has(d)).map((day, i) => (
                          <span key={day}>
                            {!!i && ", "}
                            <FormattedUnit id={`day.${day}`} />
                          </span>
                        )),
                }}
              />
            </div>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default memo(DropLabel);
