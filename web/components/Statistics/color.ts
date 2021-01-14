import { useToken } from "@chakra-ui/react";
import { hexToRgb, rgbToHex } from "../../utils";
import { normal } from "color-blend";

export function useEfficiencyColor(value: number) {
  const [red, green] = useToken("colors", ["red.500", "green.500"]);
  const source = { ...hexToRgb(red), a: 1 };
  const backdrop = { ...hexToRgb(green), a: value };

  return rgbToHex(normal(source, backdrop));
}
