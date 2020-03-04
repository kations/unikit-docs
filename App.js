import "parse-prop-types";
import * as React from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from "react-native-appearance";

import { ThemeProvider } from "./src/unikit";
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
        defaultMode={colorScheme === "dark" ? "dark" : undefined}
        theme={{
          colors: {
            modes: {
              dark: {
                background: "rgb(20,20,30)",
                surface: "rgb(40,40,50)",
                border: "rgba(255,255,255,0.1)",
                placeholder: "rgba(255,255,255,0.3)",
                text: "#FFF",
                input: "rgb(20,20,30)"
              }
            }
          }
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
