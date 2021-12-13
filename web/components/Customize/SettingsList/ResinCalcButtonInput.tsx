import React, { memo, useState } from "react";
import { HStack, Icon, Input, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import { Percent } from "react-feather";
import { ResinCap } from "../../../db/resins";

const ResinCalcButtonInput = () => {
  const [value, setValue] = useConfig("resinCalcButtons");
  const [text, setText] = useState(() =>
    value
      .map((v) => {
        if (v > 0) {
          return `+${v}`;
        } else {
          return `${v}`;
        }
      })
      .join(", ")
  );

  return (
    <Stat>
      <StatLabel>
        <HStack spacing={2}>
          <Icon as={Percent} />
          <div>
            <FormattedMessage defaultMessage="Resin calculator buttons" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Input
          value={text}
          onChange={({ currentTarget: { value } }) => {
            setText(value);
            setValue(() => {
              const values = [];

              for (const part of value.split(",")) {
                const parsed = parseInt(part);

                // value must be an integer and multiple of ten
                // clamp it within the resin cap just to make sure we are dealing with sane inputs
                if (Number.isInteger(parsed) && parsed % 10 === 0 && Math.abs(parsed) < ResinCap) {
                  values.push(parsed);
                }
              }

              return values;
            });
          }}
        />
      </StatNumber>
    </Stat>
  );
};

export default memo(ResinCalcButtonInput);
