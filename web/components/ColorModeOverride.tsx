import React, { memo, ReactNode } from "react";
import { useConfig } from "../utils/configs";
import { DarkMode } from "@chakra-ui/color-mode";
import { useToken } from "@chakra-ui/react";
import Head from "next/head";

const ColorModeOverride = ({ children }: { children?: ReactNode }) => {
  const [theme] = useConfig("theme");

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
  const [progress] = useToken("colors", ["blue.300"]);

  return (
    <Head>
      <style>{`
        :root {
          --nprogress-color: ${progress};
        }
      `}</style>
    </Head>
  );
};

const DarkModeStyle = () => {
  const [bg] = useToken("colors", ["gray.900"]);

  return (
    <Head>
      <style>{`
        :root {
          --nprogress-color: white;
          --text-color: rgba(255, 255, 255, 0.92);
        }

        body {
          background-color: ${bg} !important;
          color: var(--text-color) !important;
        }
      `}</style>
    </Head>
  );
};

export default memo(ColorModeOverride);
