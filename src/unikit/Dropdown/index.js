import React, { Children, useState } from "react";
import * as PropTypes from "prop-types";
import { TouchableOpacity, Platform } from "react-native";

import styled, { withThemeProps } from "../styled";
import Flex from "../Flex";
import Animate from "../Animate";
import Overlay from "../Overlay";

const Dropdown = withThemeProps(
  ({
    children,
    animateProps = {},
    wrapperProps = { t: "100%", l: 0 },
    content = null,
    theme,
    ...rest
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Flex relative>
        {Children.only(
          React.cloneElement(children, {
            as: TouchableOpacity,
            onPress: () => {
              setOpen(!open);
            },
            ...rest
          })
        )}
        {Platform.OS === "android" ? (
          open ? (
            <Overlay
              contentProps={{ bg: "surface", maxWidth: 500, width: "90%" }}
              visible={open}
              onClose={() => setOpen(false)}
            >
              {content}
            </Overlay>
          ) : null
        ) : (
          <Animate
            w="100%"
            from={{ o: 0, y: 20 }}
            to={{ o: 1, y: 0 }}
            isVisible={open}
            useTransition
            shadow={50}
            borderWidth={1}
            borderColor="text"
            bg="surface"
            borderColorAlpha={0.05}
            p={10}
            borderRadius={theme.globals.roundness}
            row
            absolute
            pointerEvents={open ? "auto" : "none"}
            {...wrapperProps}
            {...animateProps}
          >
            {content instanceof Function
              ? content({ close: () => setOpen(false) })
              : content}
          </Animate>
        )}
      </Flex>
    );
  },
  "Dropdown"
);

Dropdown.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  animateProps: PropTypes.object
};

Dropdown.defaultPropTypes = {};

export default Dropdown;
