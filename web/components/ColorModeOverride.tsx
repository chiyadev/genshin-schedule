import React, { memo, ReactNode, useEffect } from "react";
import { useConfig } from "../utils/config";
import { DarkMode, useColorMode } from "@chakra-ui/color-mode";
import Head from "next/head";

const ColorModeOverride = ({ children }: { children?: ReactNode }) => {
  const [theme] = useConfig("theme");
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode(theme), [theme, setColorMode]);

  switch (theme) {
    case "light":
      return (
        <>
          <LightModeStyle />
          {children}
        </>
      );

    case "dark":
      return (
        <DarkMode>
          <DarkModeStyle />
          {children}
        </DarkMode>
      );
  }
};

const LightModeStyle = () => {
  return (
    <Head>
      <style>{`
        :root {
          --nprogress-color: var(--chakra-colors-blue-300);
        }
      `}</style>
    </Head>
  );
};

const DarkModeStyle = () => {
  return (
    <Head>
      <style>{`
        :root {
          --nprogress-color: white;
          --text-color: rgba(255, 255, 255, 0.92);
        }

        body {
          background-color: var(--chakra-colors-gray-900) !important;
          color: var(--text-color) !important;
        }
      `}</style>
    </Head>
  );
};

export default memo(ColorModeOverride);
