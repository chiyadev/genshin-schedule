import React, { memo, ReactNode } from "react";
import { Configs, useConfig } from "../../utils/configs";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { Button, chakra, Collapse, Icon, VStack } from "@chakra-ui/react";

const WidgetWrapper = ({
  type,
  heading,
  children,
  onHover,
}: {
  type: keyof Configs["hiddenWidgets"];
  heading?: ReactNode;
  children?: ReactNode;
  onHover?: (value: boolean) => void;
}) => {
  const [hidden, setHidden] = useConfig("hiddenWidgets");

  return (
    <VStack align="stretch" spacing={0}>
      <chakra.div color={hidden[type] ? "gray.500" : "white"}>
        <Button
          variant="link"
          colorScheme="white"
          leftIcon={hidden[type] ? <Icon as={FaCaretRight} /> : <Icon as={FaCaretDown} />}
          size="lg"
          onClick={() => {
            setHidden((widgets) => ({ ...widgets, [type]: !widgets[type] }));
          }}
        >
          {heading}
        </Button>
      </chakra.div>

      <Collapse in={!hidden[type]} unmountOnExit>
        <chakra.div mt={4} onMouseEnter={() => onHover?.(true)} onMouseLeave={() => onHover?.(false)}>
          {children}
        </chakra.div>
      </Collapse>
    </VStack>
  );
};

export default memo(WidgetWrapper);
