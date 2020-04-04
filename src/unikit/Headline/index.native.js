import React, { useState } from "react";
import PropTypes from "prop-types";

import styled, { withThemeProps } from "../styled";
import Visible from "../Visible";
import Text from "../Text";
import Box from "../Box";
import { useTransition, animated } from "../Spring/useSpringOld";

const AnimatedView = animated(styled.View({}));

const AnimatedText = ({
  strings = [],
  level = 1,
  animateType,
  color,
  ...rest
}) => {
  const transitions = useTransition(strings, data => data, {
    from: { opacity: 0, y: 100, x: 0 },
    leave: { opacity: 0, y: 100, x: 0 },
    enter: { opacity: 1, y: 0, x: 0 },
    update: { opacity: 1, y: 0, x: 0 },
    unique: false,
    trail: 400 / strings.length
  });
  return transitions.map(({ item, props: { opacity, x, y }, key }, index) => (
    <AnimatedView
      key={`${key}-${index}`}
      style={{
        opacity: opacity,
        transform: [{ translateY: y || 0 }, { translateX: x || 0 }]
      }}
    >
      <Text level={level} color={color}>
        {item}
        {animateType === "word" ? " " : null}
      </Text>
    </AnimatedView>
  ));
};

const Headline = withThemeProps(
  ({
    level = 1,
    children,
    style,
    animate,
    animateType = "char",
    onVisible,
    stayVisible = true,
    delay = 100,
    color = "text",
    from,
    to,
    config,
    ...rest
  }) => {
    const [visible, setVisible] = useState(false);
    if (animate) {
      var splittedString = children.split(animateType === "word" ? " " : "");
      return (
        <Text
          as={Box}
          style={{ ...style, ...{ flexDirection: "row" } }}
          level={level}
          color={color}
          {...rest}
        >
          {onVisible ? (
            <Visible
              disabled={visible && stayVisible}
              onChange={isVisible => {
                setVisible(isVisible);
              }}
              offset={100}
            >
              {({ isVisible }) => {
                return <Text />;
              }}
            </Visible>
          ) : null}

          <AnimatedText
            strings={(onVisible && visible) || !onVisible ? splittedString : []}
            animateType={animateType}
            color={color}
            {...rest}
          />
        </Text>
      );
    }

    return (
      <Text level={level} style={style} color={color} {...rest}>
        {children}
      </Text>
    );
  },
  "Headline"
);

Headline.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  animate: PropTypes.bool,
  animateType: PropTypes.oneOf(["char", "word"])
};

Headline.defaultPropTypes = {
  level: 1,
  animateType: "char",
  stayVisible: true,
  delay: 100
};

export default Headline;
