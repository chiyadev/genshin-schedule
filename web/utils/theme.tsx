import { css, useTheme } from "@chakra-ui/system";

export function useColorHex(key: string) {
  const theme = useTheme();

  return css({ color: key })(theme).color as string;
}
