import React, { useState } from "react";
import * as PropTypes from "prop-types";
import tc from "tinycolor2";

import styled from "../styled";
import { useTransition, animated } from "../Spring/useSpringOld";

const Touchable = styled.TouchableOpacity(({ overflow }) => ({
  position: "relative",
  overflow: overflow ? "visible" : "hidden"
}));

const Ripple = animated(
  styled.View(({ theme, size, rippleColor }) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    position: "absolute",
    backgroundColor: tc(theme.colors[rippleColor] || rippleColor)
      .darken(5)
      .toString(),
    zIndex: 0
  }))
);

export default function Button({
  children,
  onPress,
  size = 50,
  rippleColor = "#000",
  overflow = false,
  ...rest
}) {
  const [items, setItems] = useState([]);

  const transitions = useTransition(items, items => items.key, {
    from: { opacity: 0.25, scale: 1 },
    enter: { opacity: 0, scale: 1.5 },
    leave: { opacity: 0, scale: 2 },
    onRest: item => setItems(state => state.filter(i => i.key !== item.key))
  });

  return (
    <Touchable
      onPress={e => {
        let { locationX, locationY } = e.nativeEvent;
        if (onPress) onPress();
        console.log({ locationX, locationY, evt: e.nativeEvent });
        setItems([...items, { locationX, locationY }]);
      }}
      {...rest}
      overflow={!overflow ? "hidden" : undefined}
      activeOpacity={1}
      pointerEvents="box-only"
    >
      {children}
      {transitions.map(({ item, props, key }) => (
        <Ripple
          key={`ripple-${key}`}
          size={size}
          rippleColor={rippleColor}
          style={{
            left: item ? item.locationX - size / 2 : 0,
            top: item ? item.locationY - size / 2 : 0,
            opacity: props.opacity,
            transform: props.scale.interpolate(s => [{ scale: s }])
          }}
          pointerEvents="none"
        />
      ))}
    </Touchable>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  rippleColor: PropTypes.string,
  size: PropTypes.number,
  overflow: PropTypes.bool
};
