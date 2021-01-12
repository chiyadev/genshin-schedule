import React, { memo, ReactNode } from "react";
import { Configs, useConfig } from "../../utils/configs";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { chakra, Collapse, Fade, HStack, Icon, Link, Spacer, VStack } from "@chakra-ui/react";

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

  return (
    <VStack align="stretch" spacing={0}>
      <HStack color={hidden[type] ? "gray.500" : "white"} spacing={0}>
        <Link
          as="button"
          color="white"
          fontSize="lg"
          fontWeight="bold"
          onClick={() => {
            setHidden((widgets) => ({ ...widgets, [type]: !widgets[type] }));
          }}
        >
          <HStack spacing={2}>
            {hidden[type] ? <Icon as={FaCaretRight} /> : <Icon as={FaCaretDown} />}
            <div>{heading}</div>
          </HStack>
        </Link>

        <Spacer />
        <Fade in={!hidden[type]}>{menu}</Fade>
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
