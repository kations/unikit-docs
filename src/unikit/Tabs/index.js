import React, { useState } from "react";
import * as PropTypes from "prop-types";

import styled, { withThemeProps } from "../styled";
import { useLayout, useUpdateEffect } from "../hooks";
import Group from "../Group";
import Button from "../Button";
import { AnimatedView, useSpring } from "../Spring";

const Indicator = styled(AnimatedView)();

const getIndexByValue = (options, value) => {
  if (value === undefined) return 0;
  const findIndex = options.findIndex(
    option => option === value || option.value === value
  );
  return findIndex;
};

const Tabs = withThemeProps(
  ({
    value,
    onChange,
    options = [],
    vertical,
    tabSize = 50,
    font,
    bg = "background",
    inactiveColor = "primary",
    inactiveColorAlpha = 0.6,
    activeColor = "primary",
    indicatorColor = "primary",
    tabProps = {},
    indicatorSize = 3,
    indicatorProps = {},
    springConfig = {},
    ...rest
  }) => {
    const [active, setActive] = useState(getIndexByValue(options, value) || 0);
    const { onLayout, width, height } = useLayout();
    const size = vertical ? height : width;
    const x = useSpring({
      to: Math.round(active * (size / options.length)),
      config: springConfig //{ mass: 1, tension: 300, friction: 30, duration: 300 }
    });

    useUpdateEffect(() => {
      setActive(getIndexByValue(options, value));
    }, [value]);

    return (
      <Group relative bg={bg} row={!vertical} onLayout={onLayout} {...rest}>
        <Indicator
          pointerEvents="none"
          absolute
          bg={indicatorColor}
          vertical={vertical}
          zIndex={0}
          {...indicatorProps}
          style={{
            ...indicatorProps.style,
            transform: vertical ? [{ translateY: x }] : [{ translateX: x }],
            width: vertical ? indicatorSize : `${100 / options.length}%`,
            height: !vertical ? indicatorSize : `${100 / options.length}%`
          }}
        />
        {options.map((item, index) => {
          const isActive = index === active;
          return (
            <Button
              bg={"transparent"}
              color={isActive ? activeColor : inactiveColor}
              key={index}
              size={tabSize}
              onPress={() => {
                setActive(index);
                if (onChange)
                  onChange(item.value !== undefined ? item.value : item);
              }}
              {...tabProps}
              labelProps={{
                ...tabProps.labelProps,
                ...(font ? { font } : {}),
                bgAware: bg,
                colorAlpha: isActive ? undefined : inactiveColorAlpha
              }}
              zIndex={100}
            >
              {item.label || item}
            </Button>
          );
        })}
      </Group>
    );
  },
  "Tabs"
);

const PropComponent = () => null;

Tabs.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  vertical: PropTypes.bool,
  tabSize: PropTypes.number,
  font: PropTypes.string,
  bg: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  tabProps: PropTypes.object,
  indicatorSize: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  indicatorProps: PropTypes.object
};

//Just for docs
Tabs.defaultPropTypes = {
  options: [],
  tabSize: 50,
  bg: "background",
  activeColor: "primary",
  indicatorColor: "primary",
  tabProps: {},
  indicatorSize: 3,
  indicatorProps: {}
};

export default Tabs;
