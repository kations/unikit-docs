import "parse-prop-types";
import React, { useEffect } from "react";
import { Link } from "gatsby";
import { ThemeProvider, Headline, Icon, Header, useTheme } from "../unikit";
import { Wrapper } from "../components";
import "./layout.css";
const Head = () => {
  const theme = useTheme();

  return (
    <Header
      w="100vw"
      h={60}
      l={0}
      t={0}
      zIndex={999}
      justify="center"
      bg="surface"
      shadow={4}
      style={{
        transitionProperty: "all",
        transitionDuration: "250ms"
      }}
      fixed
    >
      <Wrapper justify="space-between" align="center" row>
        <Link to="/">
          <Headline style={{ fontSize: 30 }}>unikit</Headline>
        </Link>
        <Icon
          name={theme.mode === "dark" ? "moon" : "sun"}
          size={30}
          animate
          onPress={() => {
            localStorage.setItem(
              "darkMode",
              theme.mode === "dark" ? "false" : "true"
            );
            theme.update({ mode: theme.mode === "dark" ? "default" : "dark" });
          }}
        />
      </Wrapper>
    </Header>
  );
};

const checkDark = () => {
  if (typeof window === "undefined") return false;
  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedMode = localStorage.getItem("darkMode") === "true";
  return savedMode !== null ? savedMode : darkMode;
};

export default function Layout({ children }) {
  const isDark = checkDark();
  return (
    <ThemeProvider
      defaultMode={isDark ? "dark" : undefined}
      theme={{
        colors: {
          modes: {
            dark: {
              background: "rgb(20,20,30)",
              surface: "rgb(40,40,50)",
              border: "rgba(255,255,255,0.1)",
              text: "#FFF",
              input: "rgb(20,20,30)"
            }
          }
        },
        Page: {
          minHeight: "100vh",
          pt: 80
        }
      }}
    >
      <Head />
      {children}
    </ThemeProvider>
  );
}
