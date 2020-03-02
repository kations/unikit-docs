import React, { useState } from "react";
import PropTypes from "prop-types";

import { withThemeProps } from "../styled";
import Headline from "../Headline";
import Text from "../Text";
import Button from "../Button";
import Overlay from "../Overlay";
import Group from "../Group";

const ActionSheet = withThemeProps(
  ({
    actions = [],
    buttonSize = 50,
    onActionPress,
    onClose,
    cancelText = "Cancel",
    cancelColor = "error",
    contentProps = {
      maxWidth: 600,
      bg: "transparent",
      w: "90%",
      shadow: 0
    },
    title,
    desc,
    ...rest
  }) => {
    return (
      <Overlay
        position="bottom"
        height="auto"
        onClose={onClose}
        contentProps={contentProps}
        {...rest}
      >
        {title && <Headline>{title}</Headline>}
        {desc && <Text>{desc}</Text>}
        <Group bg="surface" mb={6} gap={0} shadow={10} vertical>
          {actions.map(({ onPress, label, ...rest }, index) => {
            return (
              <Button
                clean
                key={`action-${index}`}
                style={{
                  borderColor: "rgba(0,0,0,0.05)",
                  borderBottomWidth: 1
                }}
                size={buttonSize}
                onPress={() => {
                  if (onPress) {
                    onPress();
                  }
                  if (onActionPress) {
                    onActionPress({ onPress, label, ...rest });
                  }
                }}
                {...rest}
              >
                {label}
              </Button>
            );
          })}
        </Group>

        <Group bg="surface" mb={25} gap={0} shadow={10} vertical>
          <Button
            clean
            size={buttonSize}
            color="error"
            onPress={onClose || null}
            color={cancelColor}
          >
            {cancelText}
          </Button>
        </Group>
      </Overlay>
    );
  },
  "ActionSheet"
);

ActionSheet.propTypes = {
  actions: PropTypes.array,
  buttonSize: PropTypes.number,
  onActionPress: PropTypes.func,
  cancelText: PropTypes.string,
  cancelColor: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
};

ActionSheet.defaultProps = {
  actions: [],
  buttonSize: 50,
  cancelText: "Cancel",
  cancelColor: "error",
  contentProps: {
    maxWidth: 600,
    bg: "transparent",
    w: "90%",
    shadow: 0
  }
};

export default ActionSheet;
