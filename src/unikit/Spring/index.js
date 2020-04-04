import * as React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import {
  useTimingTransition,
  useSpringTransition,
  withSpringTransition,
  withTimingTransition,
  bin
} from "./transitions";
import { interpolateColor } from "./colors";

const useMemoOne = React.useMemo;
const isWeb = Platform.OS === "web";
const isAndroid = Platform.OS === "android";
export const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableOpacity
);
export const AnimatedView = Animated.createAnimatedComponent(View);

const {
  Value,
  set,
  cond,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Extrapolate,
  useCode,
  createAnimatedComponent
} = Animated;

// export const useAnimation = ({ value, config = {} }) => {
//   const hook = config.duration ? useTimingTransition : useSpringTransition;
//   var x = hook(value, config);
//   return x;
// };

//TODO MOCK API
export const useSpring = ({ from, to, config = {}, immediate }) => {
  const hook = config.duration ? withTimingTransition : withSpringTransition;
  const value = useMemoOne(() => new Value(from !== undefined ? from : to), [
    from
  ]);
  useCode(() => set(value, typeof to === "boolean" ? bin(to) : to), [
    to,
    value
  ]);
  const transition = useMemoOne(() => hook(value, config, immediate), [value]);
  return transition;
};

export const intColorWeb = (value, { color }) => {
  return color;
};

export const intColorNative = (value, { inputRange, outputRange }) => {
  return interpolateColor(value, {
    inputRange,
    outputRange
  });
};

export const intColor = isWeb || isAndroid ? intColorWeb : intColorNative;

export {
  createAnimatedComponent,
  Animated,
  cond,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Extrapolate,
  Value
};

export * from "./colors";
