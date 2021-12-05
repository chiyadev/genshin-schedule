import React, { memo, useMemo } from "react";
import { DomainDropSet, DomainDropSets } from "../db/domainDropSets";
import { Domain, Domains } from "../db/domains";
import { FormattedUnit, Weekday, Weekdays } from "../utils/time";
import { getAssetByName } from "../assets";
import { Badge, chakra, HStack, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { FormattedMessage, FormattedMessage as FormattedMessageId, useIntl } from "react-intl";
import { DomainCategories, DomainCategory } from "../db/domainCategories";
import { Region, Regions } from "../db/regions";

const DropLabel = ({ item }: { item: DomainDropSet["items"][0] }) => {
  const { formatMessage } = useIntl();

  const domains = useMemo(() => {
    const drops = DomainDropSets.filter((d) => [...d.items, ...(d.itemsAux || [])].includes(item));

    return (
      drops &&
      Domains.filter((d) => d.drops.some((d) => drops.includes(d)))
        .map((domain) => {
          const category = DomainCategories.find((category) => category.domains.includes(domain));
          const region = Regions.find((region) => region.domains.includes(domain));
          return [domain, category, region] as [Domain, DomainCategory, Region];
        })
        .sort((a, b) => {
          const category = DomainCategories.indexOf(a[1]) - DomainCategories.indexOf(b[1]);
          if (category) return category;

          const region = Regions.indexOf(a[2]) - Regions.indexOf(b[2]);
          if (region) return region;

          const name = a[0].name.localeCompare(b[0].name);
          return name;
        })
    );
  }, [item]);

  if (!domains.length) {
    return (
      <div>
        <FormattedMessage defaultMessage="This item does not currently drop from any domains." />
      </div>
    );
  }

  return (
    <VStack align="start" spacing={0}>
      {domains.map(([domain, category, region]) => {
        const days = new Set<Weekday>();
        let auxiliary = true;

        for (const drops of domain.drops) {
          if ([...drops.items, ...(drops.itemsAux || [])].includes(item)) {
            for (const day of drops.days) {
              days.add(day);
              auxiliary &&= drops.itemsAux?.includes(item) || false;
            }
          }
        }

        return (
          <HStack
            key={domain.name}
            spacing={2}
            opacity={auxiliary ? 0.5 : 1}
            title={auxiliary ? formatMessage({ defaultMessage: "Auxiliary drop based on probability" }) : undefined}
          >
            <chakra.img alt={region.name} title={region.name} src={getAssetByName(region.name)} w={4} h={4} />

            <div>
              <Badge colorScheme={category.colorHint}>
                <FormattedMessage
                  defaultMessage="{category}, {region}"
                  values={{
                    category: (
                      <Link href={category.wiki} isExternal>
                        <FormattedMessageId id={category.name} />
                      </Link>
                    ),
                    region: (
                      <Link href={region.wiki} isExternal>
                        <FormattedMessageId id={region.name} />
                      </Link>
                    ),
                  }}
                />
              </Badge>{" "}
              <FormattedMessage
                defaultMessage="{domain}{days, select, undefined {} other { on {days}}}"
                values={{
                  domain: (
                    <Link
                      color={`${category.colorHint}.${useColorModeValue("500", "300")}`}
                      fontWeight="semibold"
                      href={domain.wiki}
                      isExternal
                    >
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
