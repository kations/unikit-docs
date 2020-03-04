import React, { useState } from "react";
import { Dimensions, TouchableOpacity, Platform } from "react-native";
import { useTransition, animated } from "react-spring/native";
import PropTypes from "prop-types";

import styled, { withThemeProps, useTheme } from "../styled";
import Flex from "../Flex";
import Switch from "./Switch";
import Text from "./Text";
import DatePicker from "./DatePicker";
import Slider from "./Slider";
import Color from "./Color";
import Select from "./Select";
import Number from "./Number";
import Checkbox from "./Checkbox";
import MultiSelect from "./MultiSelect";
import Tags from "./Tags";

const Label = styled.Text(({ color, size }) => ({
  color: color,
  font: "label"
}));

const InputWrapper = styled.View(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  height: "auto",
  borderRadius: theme.globals.roundness
}));

const BorderWrap = styled.View(({ theme, size }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  height: "100%",
  width: size,
  zIndex: 100,
  overflow: "hidden",
  borderRadius: theme.globals.roundness,
  justifyContent: "flex-end"
}));

const BorderBlur = styled.View(({ borderBlurColor }) => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  height: 2,
  width: "100%",
  backgroundColor: borderBlurColor
}));

const Border = animated(
  styled.View(({ borderFocusColor }) => ({
    height: 2,
    width: "100%",
    backgroundColor: borderFocusColor
  }))
);

const Surface = styled.View();

const SwitchInput = ({ label, bg, clean, labelColor, size = 35, ...rest }) => {
  const theme = useTheme();
  return (
    <Flex
      p={theme.globals.inputGap * 0.6}
      pl={theme.globals.inputGap}
      br={theme.globals.roundness}
      row
      w="100%"
      content="space-between"
      align="center"
      bg={bg}
    >
      <Label font="p" color={labelColor}>
        {label}
      </Label>
      <Switch size={size} {...rest} />
    </Flex>
  );
};

const CheckboxInput = ({ label, bg, clean, labelColor, ...rest }) => {
  const theme = useTheme();
  return (
    <Flex
      p={theme.globals.inputGap * 0.6}
      pl={theme.globals.inputGap}
      row
      w="auto"
      align="center"
      bg={bg}
    >
      <Checkbox {...rest} />
      <Label font="p" ml={theme.globals.inputGap * 0.5} color={labelColor}>
        {label}
      </Label>
    </Flex>
  );
};

const types = {
  text: Text,
  textarea: Text,
  select: Select,
  switch: SwitchInput,
  date: DatePicker,
  datetime: DatePicker,
  time: DatePicker,
  range: Slider,
  color: Color,
  number: Number,
  checkbox: CheckboxInput,
  multiselect: MultiSelect,
  tags: Tags
};

const getTypeProps = ({ theme, clean }) => ({
  range: {
    inputWrap: {
      px: clean ? 0 : theme.globals.inputGap,
      py: theme.globals.inputGap,
      bg: "transparent"
    }
  },
  switch: {
    inputWrap: {
      mt: theme.globals.inputGap / 2
    },
    wrapperProps: {
      style: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    labelProps: {
      size: "p"
    }
  },
  checkbox: {
    inputWrap: {
      px: clean ? 0 : theme.globals.inputGap,
      py: theme.globals.inputGap,
      bg: "transparent"
    },
    labelProps: {
      size: "p",
      style: {
        marginLeft: 10
      }
    }
  },
  number: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    }
  },
  select: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    }
  },
  color: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    }
  },
  date: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    },
    wrapperProps: {
      readOnly: true
    }
  },
  text: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    }
  },
  textarea: {
    inputWrap: {
      mt: !clean ? -theme.globals.inputGap / 2 : 0
    },
    input: {
      numberOfLines: 3,
      multiline: true
    }
  }
});

export function Input({
  children,
  label,
  indentLabel = false,
  error,
  style,
  direction,
  type,
  onChange,
  value,
  labelColor = "text",
  borderProps = {},
  wrapperProps = {},
  placeholder,
  borderBlurColor = "transparent",
  borderFocusColor = "primary",
  required = false,
  clean = true,
  floating = false,
  options,
  shadow,
  ...rest
}) {
  const theme = useTheme();
  const [focused, setFocus] = useState(false);
  const [width, setWidth] = useState(Dimensions.get("window").width);

  const InputComp = types[type] || undefined;

  const TypeProps = getTypeProps({ theme, clean })[type] || {};

  const transitions = useTransition(focused, null, {
    from: { left: -width },
    enter: { left: 0 },
    leave: { left: width }
  });

  return (
    <InputWrapper
      as={
        ["switch", "checkbox"].indexOf(type) > -1 ? TouchableOpacity : undefined
      }
      onPress={() => {
        if (onChange) {
          onChange(!value);
        }
      }}
      bg={clean ? "transparent" : "input"}
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
      activeOpacity={0.8}
      shadow={clean ? undefined : shadow}
      style={{
        ...style,
        ...(TypeProps.wrapperProps ? TypeProps.wrapperProps.style : {})
      }}
    >
      {label ? (
        <Flex>
          {label && ["switch", "checkbox"].indexOf(type) === -1 ? (
            <Label
              accessibilityRole={Platform.OS === "web" ? "label" : "text"}
              color={error ? "error" : focused ? "primary" : labelColor}
              mb={clean ? 5 : 0}
              ml={clean && indentLabel !== true ? 0 : theme.globals.inputGap}
              mt={theme.globals.inputGap}
              {...TypeProps.labelProps}
            >
              {label}
              {required ? "*" : null}
            </Label>
          ) : null}
        </Flex>
      ) : null}
      <Surface
        w="100%"
        bg={clean ? "input" : "transparent"}
        shadow={clean ? shadow : undefined}
        borderRadius={theme.globals.roundness}
        {...TypeProps.inputWrap}
      >
        {InputComp ? (
          <InputComp
            bg={"transparent"}
            onChange={onChange}
            value={value}
            setFocus={setFocus}
            type={type}
            required={required}
            options={options}
            placeholder={placeholder}
            labelColor={error ? "error" : focused ? "primary" : labelColor}
            label={label}
            clean={clean}
            {...(TypeProps.input || {})}
            {...rest}
          />
        ) : null}
        {children
          ? React.Children.only(
              React.cloneElement(children, {
                setFocus,
                onChange,
                value,
                type,
                label,
                required,
                clean,
                labelColor: error ? "error" : focused ? "primary" : labelColor,
                ...children.props,
                ...(TypeProps.input || {}),
                ...rest
              })
            )
          : null}
      </Surface>
      <BorderWrap size={width} pointerEvents="none">
        <BorderBlur borderBlurColor={borderBlurColor} />
        {transitions.map(({ item, key, props }) =>
          item ? (
            <Border
              key={key}
              borderFocusColor={borderFocusColor}
              {...borderProps}
              style={{
                transform: [{ translateX: props.left }],
                ...borderProps.style
              }}
            />
          ) : null
        )}
      </BorderWrap>
    </InputWrapper>
  );
}

const InputWithTheme = withThemeProps(Input, "Input");

InputWithTheme.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "range",
    "date",
    "time",
    "datetime",
    "checkbox",
    "number",
    "select",
    "multiselect",
    "switch",
    "tags"
  ]),
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  labelColor: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  clean: PropTypes.bool,
  floating: PropTypes.bool
};

InputWithTheme["Text"] = Text;
InputWithTheme["Slider"] = Slider;
InputWithTheme["Tags"] = Tags;
InputWithTheme["Switch"] = Switch;
InputWithTheme["Select"] = Select;
InputWithTheme["Number"] = Number;
InputWithTheme["Checkbox"] = Checkbox;
InputWithTheme["DatePicker"] = DatePicker;
InputWithTheme["Color"] = Color;
InputWithTheme["MultiSelect"] = MultiSelect;

export default InputWithTheme;
