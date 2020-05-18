import React, { Children, useState, Fragment } from "react";
import * as PropTypes from "prop-types";
import { TouchableOpacity, Platform } from "react-native";

import styled, { withThemeProps } from "../styled";
import Flex from "../Flex";
import Animate from "../Animate";
import Overlay from "../Overlay";

const BackdropPress = styled.TouchableOpacity(({ zIndex, theme }) => ({
  position: Platform.OS === "web" ? "fixed" : "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
}));

const Dropdown = withThemeProps(
  ({
    children,
    animateProps = {},
    wrapperProps = { t: "100%", l: 0 },
    content = null,
    theme,
    backdrop = false,
    ...rest
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        {backdrop && Platform.OS !== "web" ? (
          <Animate
            isVisible={open}
            from={{ o: 0 }}
            to={{ o: 0.05 }}
            zIndex={0}
            absolute
            t={-2500}
            r={-2500}
            w={5000}
            h={5000}
            bg="#000"
          >
            <BackdropPress
              onPress={() => setOpen(false)}
              activeOpacity={1}
              absoluteFill
            />
          </Animate>
        ) : null}
        <Flex relative>
          {Children.only(
            React.cloneElement(children, {
              as: TouchableOpacity,
              onPress: () => {
                setOpen(!open);
              },
              ...rest,
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
      </Fragment>
    );
  },
  "Dropdown"
);

Dropdown.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  animateProps: PropTypes.object,
};

Dropdown.defaultPropTypes = {};

export default Dropdown;
