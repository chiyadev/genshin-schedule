import React, { memo, ReactNode } from "react";
import { Config, useConfig } from "../../utils/config";
import { chakra, Collapse, Fade, HStack, Icon, Link, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { ChevronRight } from "react-feather";

const WidgetWrapper = ({
  type,
  heading,
  children,
  menu,
  onHover,
}: {
  type: keyof Config["hiddenWidgets"];
  heading?: ReactNode;
  children?: ReactNode;
  menu?: ReactNode;
  onHover?: (value: boolean) => void;
}) => {
  const [hidden, setHidden] = useConfig("hiddenWidgets");
  const disabledColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack align="stretch" spacing={0}>
      <HStack color={hidden[type] ? disabledColor : undefined} spacing={0}>
        <Link
          as="button"
          whiteSpace="pre"
          fontSize="xl"
          fontWeight="bold"
          fontFamily="Genshin"
          onClick={() => {
            setHidden((widgets) => ({ ...widgets, [type]: !widgets[type] }));
          }}
        >
          <HStack spacing={2}>
            <div>{heading}</div>
            <Icon
              as={ChevronRight}
              transition=".1s cubic-bezier(0.16, 1, 0.3, 1)"
              transform={hidden[type] ? undefined : "rotate(90deg)"}
            />
          </HStack>
        </Link>

        <Spacer />
        <Fade in={!hidden[type]} unmountOnExit>
          {menu}
        </Fade>
      </HStack>

      <Collapse in={!hidden[type]} unmountOnExit>
        <chakra.div mt={4} onMouseEnter={() => onHover?.(true)} onMouseLeave={() => onHover?.(false)}>
          {children}
        </chakra.div>
      </Collapse>
    </VStack>
  );
};

export default memo(WidgetWrapper);
