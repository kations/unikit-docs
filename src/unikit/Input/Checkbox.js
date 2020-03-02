import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring/native";
import PropTypes from "prop-types";

import styled from "../styled";

const Checkbox = styled.TouchableOpacity(({ circleSize, borderSize }) => ({
  width: circleSize,
  height: circleSize,
  borderWidth: borderSize,
  borderColor: "primary",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: circleSize / 2
}));

const Circle = styled.View(({ circleSize, borderSize }) => ({
  width: circleSize - borderSize * 4,
  height: circleSize - borderSize * 4,
  backgroundColor: "primary",
  borderRadius: circleSize / 2
}));

const AnimatedCircle = animated(Circle);

const Comp = ({
  type = "primary",
  value,
  onChange,
  circleSize = 26,
  style,
  borderSize = 2,
  ...rest
}) => {
  const [active, setActive] = useState(value || false);

  const { scale, opacity } = useSpring({
    to: {
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0
    }
  });

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <Checkbox
      type={type}
      style={style}
      activeOpacity={0.8}
      circleSize={circleSize}
      borderSize={borderSize}
      onPress={() => {
        const newValue = !active;
        setActive(newValue);
        setTimeout(() => {
          if (onChange) {
            onChange(newValue);
          }
        }, 299);
      }}
      {...rest}
    >
      <AnimatedCircle
        circleSize={circleSize}
        borderSize={borderSize}
        style={{ opacity, transform: [{ scale: scale }] }}
      />
    </Checkbox>
  );
};

Comp.propTypes = {
  value: PropTypes.bool,
  style: PropTypes.object,
  circleSize: PropTypes.number,
  borderSize: PropTypes.number,
  onChange: PropTypes.func
};

export default Comp;
