import * as React from "react";
import Animated, { Easing } from "react-native-reanimated";
//import { useMemoOne } from "use-memo-one";
const useMemoOne = React.useMemo;
export const bin = (value) => (value ? 1 : 0);

const {
  Value,
  cond,
  eq,
  block,
  set,
  Clock,
  spring,
  startClock,
  stopClock,
  timing,
  neq,
  useCode,
  SpringUtils,
  not,
  clockRunning,
} = Animated;

export const defaultSpringConfig = SpringUtils.makeDefaultConfig();

export const delayAni = (node, duration) => {
  const clock = new Clock();
  return block([
    timing({ clock, from: 0, to: 1, duration }),
    cond(not(clockRunning(clock)), node),
  ]);
};

export const withTransition = ({
  value,
  customConfig = {},
  immediate,
  loop,
}) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...customConfig,
  };

  const looping = loop
    ? [
        cond(state.finished, [
          stopClock(clock),
          set(state.finished, 0),
          set(state.position, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          startClock(clock),
        ]),
      ]
    : [];

  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    ...looping,
    timing(clock, state, config),
    state.position,
  ]);
};

export const withSpringTransition = ({
  value,
  customConfig = defaultSpringConfig,
  immediate,
  velocity = 0,
  delay = 0,
  loop,
}) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
    active: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...customConfig,
  };

  const looping = loop
    ? [
        cond(state.finished, [
          stopClock(clock),
          set(state.finished, 0),
          set(state.position, 0),
          set(state.time, 0),
          set(state.velocity, 0),
          startClock(clock),
        ]),
      ]
    : [];

  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    ...looping,
    state.position,
  ]);
};

export const withTimingTransition = withTransition;

export const useTransition = (state, config = {}) => {
  const value = useMemoOne(() => new Value(0), []);
  useCode(() => set(value, typeof state === "boolean" ? bin(state) : state), [
    state,
    value,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transition = useMemoOne(() => withTransition(value, config), [value]);
  return transition;
};

export const useSpringTransition = (state, config = defaultSpringConfig) => {
  const value = useMemoOne(() => new Value(0), []);
  useCode(() => set(value, typeof state === "boolean" ? bin(state) : state), [
    state,
    value,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transition = useMemoOne(() => withSpringTransition(value, config), [
    value,
  ]);
  return transition;
};

export const useTimingTransition = useTransition;
