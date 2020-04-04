import * as React from "react";
import * as PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import tc from "tinycolor2";

import styled, { useTheme, withThemeProps } from "../styled";
import Hoverable from "../Hoverable";
import Ripple from "../Ripple";
import Progress from "../Progress";
import { isDark } from "../util";

const getBackground = ({
  bg,
  theme,
  isHovered,
  outlined,
  light,
  clean,
  textColor
}) => {
  if (outlined) {
    return isHovered
      ? tc(theme.colors[bg] || bg)
          .setAlpha(0.1)
          .toRgbString()
      : "transparent";
  }
  if (light) {
    return isHovered
      ? tc(theme.colors[bg] || bg)
          .setAlpha(0.15)
          .toRgbString()
      : tc(theme.colors[bg] || bg)
          .setAlpha(0.1)
          .toRgbString();
  }
  if (clean) {
    return isHovered
      ? tc(theme.colors[textColor] || textColor)
          .setAlpha(0.1)
          .toRgbString()
      : "transparent";
  }
  return isHovered
    ? tc(theme.colors[bg] || bg)
        .darken(5)
        .toString()
    : theme.colors[bg] || bg;
};

const Touchable = styled.View({
  position: "relative",
  flexDirection: "row",
  width: "auto",
  alignItems: "center",
  justifyContent: "center",
  web: {
    cursor: "pointer",
    transitionProperty: "all",
    transitionDuration: "250ms"
  }
});

const Label = styled.Text(({ textColor, size }) => ({
  fontSize: size / 3,
  color: textColor,
  textAlign: "center"
}));

const LoadingWrap = styled.View({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center"
});

const Button = withThemeProps(
  ({
    children,
    size = 44,
    bg = "primary",
    activeOpacity = 0.9,
    outlined = false,
    rounded = false,
    light = false,
    clean = false,
    color,
    labelProps = {},
    ripple = false,
    loading = false,
    disabled = false,
    progress,
    renderLeft = null,
    renderRight = null,
    ...rest
  }) => {
    const theme = useTheme();
    const textColor = color
      ? color
      : outlined || light || clean
      ? theme.colors[bg] || bg
      : isDark(theme.colors[bg] || bg)
      ? "#FFF"
      : "#000";
    return (
      <Hoverable>
        {isHovered => (
          <Touchable
            as={ripple ? Ripple : TouchableOpacity}
            isHovered={isHovered}
            activeOpacity={activeOpacity}
            size={size}
            outlined={outlined ? 1 : 0}
            rounded={rounded ? 1 : 0}
            light={light ? 1 : 0}
            clean={clean ? 1 : 0}
            bg={getBackground({
              bg,
              theme,
              outlined,
              isHovered,
              light,
              clean,
              textColor
            })}
            bc={theme.colors[bg] || bg}
            bw={outlined ? 3 : 0}
            br={rounded ? size : theme.globals.roundness}
            h={size}
            px={size / 2}
            rippleColor={ripple ? bg : undefined}
            disabled={loading ? true : disabled}
            accessibilityRole="button"
            {...rest}
          >
            {loading || progress ? (
              <LoadingWrap pointerEvents="none">
                <Progress
                  trackColor="transparent"
                  progressColor={textColor}
                  size={size / 2}
                  progressWidth={2}
                  value={progress}
                  loading={loading}
                />
              </LoadingWrap>
            ) : null}
            {renderLeft}
            {typeof children === "string" ? (
              <Label
                textColor={
                  loading === true || progress < 100 ? "transparent" : textColor
                }
                outlined={outlined ? 1 : 0}
                light={light ? 1 : 0}
                size={size}
                pointerEvents="none"
                numberOfLines={1}
                {...labelProps}
              >
                {children}
              </Label>
            ) : (
              children
            )}

            {renderRight}
          </Touchable>
        )}
      </Hoverable>
    );
  },
  "Button"
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  bg: PropTypes.string,
  color: PropTypes.string,
  labelStyle: PropTypes.object,
  labelProps: PropTypes.object,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  light: PropTypes.bool,
  clean: PropTypes.bool,
  ripple: PropTypes.bool,
  loading: PropTypes.bool,
  progress: PropTypes.number
};

Button.defaultPropTypes = {
  size: 50,
  bg: "primary",
  labelProps: {}
};

export default Button;
