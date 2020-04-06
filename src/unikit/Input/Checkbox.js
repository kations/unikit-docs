import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styled from "../styled";
import { AnimatedView, useSpring } from "../Spring";

const Checkbox = styled.TouchableOpacity(({ size, borderSize }) => ({
  width: size,
  height: size,
  borderWidth: borderSize,
  borderColor: "primary",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: size / 2
}));

const Circle = styled(AnimatedView)(({ size, borderSize }) => ({
  width: size - borderSize * 4,
  height: size - borderSize * 4,
  backgroundColor: "primary",
  borderRadius: size / 2
}));

const Comp = ({
  type = "primary",
  value,
  onChange,
  size = 26,
  style,
  borderSize = 2,
  ...rest
}) => {
  const [active, setActive] = useState(value || false);

  const opacity = useSpring({
    to: active ? 1 : 0
  });

  const scale = useSpring({
    to: active ? 1 : 0
  });

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <Checkbox
      type={type}
      style={style}
      activeOpacity={0.8}
      size={size}
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
      <Circle
        size={size}
        borderSize={borderSize}
        style={{ opacity, transform: [{ scale: scale }] }}
      />
    </Checkbox>
  );
};

Comp.propTypes = {
  value: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.number,
  borderSize: PropTypes.number,
  onChange: PropTypes.func
};

export default Comp;
