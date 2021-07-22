import React, { forwardRef, HTMLProps, memo, useState } from "react";
import { useMeasuredTextWidth } from "../utils/dom";
import { chakra } from "@chakra-ui/react";

const AutoSizeInput = forwardRef<HTMLInputElement>(
  ({ value, className, style, onFocus, onBlur, ...props }: HTMLProps<HTMLInputElement>, ref) => {
    const [focus, setFocus] = useState(false);
    const width = useMeasuredTextWidth(value as any, className || style);

    return (
      <input
        ref={ref}
        className={className}
        style={{
          width: (width || 0) + (focus ? 8 : 0),
          cursor: focus ? undefined : "pointer",
          ...style,
        }}
        value={value}
        onFocus={(e) => {
          setFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);

export default chakra<typeof AutoSizeInput, HTMLProps<HTMLInputElement>>(memo(AutoSizeInput), {
  baseStyle: {
    textAlign: "center",
    background: "inherit",
    borderRadius: "sm",
  },
});
