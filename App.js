import "parse-prop-types";
import * as React from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appearance } from "react-native-appearance";

import { ThemeProvider, color } from "./src/unikit";
import Home from "./src/pages";
import Template from "./src/templates/component";

import { pages } from "./pages";

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App() {
  let colorScheme = Appearance.getColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <ThemeProvider
        mode={colorScheme === "dark" ? "dark" : "dark"}
        theme={{
          colors: {
            background: "#F9F8F2",
            primary: "#54C1BE",
            shadow: "#E6E3E3",
            primaryLight: color("#54C1BE").setAlpha(0.1).toRgbString(),
            primaryMedium: color("#54C1BE").setAlpha(0.5).toRgbString(),
            text: "#5A6175",
            success: "#54C1BE",
            border: "rgba(0,0,0,0.1)",
            modes: {
              dark: {
                background: "#211E39",
                surface: "#34345D",
                input: "#34345D",
                shadow: "rgba(0,0,0,0.3)",
                text: "#FFF",
                border: "rgba(255,255,255,0.1)",
              },
            },
          },
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="Unikit" component={Home} />
          {pages.map(({ path, ...rest }, index) => {
            return (
              <Stack.Screen
                key={index}
                name={path.replace("/", "")}
                component={Template}
                initialParams={rest}
              />
            );
          })}
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
