import React, { memo, ReactNode } from "react";
import { Configs, useConfig } from "../../utils/configs";
import { FaCaretRight } from "react-icons/fa";
import { chakra, Collapse, Fade, HStack, Icon, Link, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";

const WidgetWrapper = ({
  type,
  heading,
  children,
  menu,
  onHover,
}: {
  type: keyof Configs["hiddenWidgets"];
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
              as={FaCaretRight}
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
