import React, { Fragment, useState, useEffect } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import styled, { withThemeProps } from "../styled";
import Visible from "../Visible";

import { Animated, useSpring } from "../Spring";
import { useUpdateEffect } from "../hooks";

const Box = styled(Animated.View)();

const Animate = withThemeProps(
  ({
    from = { o: 0, y: 100, x: 0 },
    to = { o: 1, y: 0, x: 0 },
    children,
    stayVisible = true,
    onVisible,
    isVisible = true,
    delay,
    duration,
    config,
    style,
    ...rest
  }) => {
    const [visible, setVisible] = useState(false);

    const x = useSpring({
      to: visible ? to.x || 0 : from.x || 0,
      config
    });
    const y = useSpring({
      to: visible ? to.y || 0 : from.y || 0,
      config
    });

    const opacity = useSpring({
      to: visible
        ? to.o !== undefined
          ? to.o
          : 1
        : from.o !== undefined
        ? from.o
        : 1,
      config
    });

    useEffect(() => {
      if (isVisible && !onVisible) {
        setTimeout(() => {
          setVisible(true);
        }, delay || 50);
      }
    }, []);

    useUpdateEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);

    // const { opacity, x, y, z } = useSpring({
    //   from,
    //   to: (!visible && onVisible) || isVisible === false ? from : to,
    //   config: springConfig[config] || config || springConfig.default,
    //   delay: delay || 0
    // });

    const AnimatedComp = (
      <Box
        style={{
          ...style,
          opacity: opacity,
          transform: [{ translateY: y }, { translateX: x }]
        }}
        pointerEvents={visible ? "auto" : "none"}
        {...rest}
      >
        {children}
      </Box>
    );

    if (onVisible) {
      return (
        <Fragment>
          <Visible
            stayVisible={stayVisible}
            onChange={isVisible => {
              setVisible(isVisible);
            }}
            offset={100}
          >
            {({ isVisible }) => {
              return <View />;
            }}
          </Visible>
          {AnimatedComp}
        </Fragment>
      );
    }

    return AnimatedComp;
  },
  "Animate"
);

Animate.propTypes = {
  children: PropTypes.node,
  from: PropTypes.object,
  to: PropTypes.object,
  stayVisible: PropTypes.bool,
  onVisible: PropTypes.bool,
  isVisible: PropTypes.bool,
  delay: PropTypes.number,
  duration: PropTypes.number,
  config: PropTypes.object,
  style: PropTypes.object
};

Animate.defaultPropTypes = {
  from: { o: 0, y: 100, x: 0 },
  to: { o: 1, y: 0, x: 0 },
  stayVisible: true,
  isVisible: true
};

export default Animate;
