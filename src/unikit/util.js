import color from "color";
import { Dimensions, Platform, PixelRatio } from "react-native";

const get = require("get-value");
const set = require("set-value");

export function rem(value) {
  if (Platform.OS === "web") return `${value}rem`;
  return PixelRatio.getFontScale() * 16 * value;
}

export function em(value) {
  if (Platform.OS === "web") return `${value}em`;
  return rem(value);
}

export const setObjValue = (obj, path, value) => {
  return set(obj, path, value);
};

export const getObjValue = (obj, path) => {
  return get(obj, path);
};

export const isDark = colorString => {
  if (isColor(colorString)) {
    const { r, g, b } = color(colorString)
      .rgb()
      .object();
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 180 ? true : false;
  } else {
    return false;
  }
};

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const isIphoneX = () => {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
};

export const getProgress = (a, b, v) => {
  return (v - a) / (b - a);
};

export const getValueByProgress = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const interpolate = (min, max, value) => {
  var theVariable = value * 3; // 1 to 100
  var distance = max - min;
  var position = min + (theVariable / 100) * distance;
  return position;
};

const isColor = col => {
  try {
    color(col)
      .lighten(0.9)
      .toString();
    return true;
  } catch (err) {
    return false;
  }
};
