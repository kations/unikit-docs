import React from "react";
import { Path, Line, G } from "react-native-svg";
import tc from "tinycolor2";

import styled, { useTheme } from "../styled";
import Flex from "../Flex";
import Text from "../Text";

var top = 1,
  right = 2,
  bottom = 3,
  left = 4;

function identity(x) {
  return x;
}

function translateX(x) {
  return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y) {
  return "translate(0," + (y + 0.5) + ")";
}

function number(scale) {
  return function (d) {
    return +scale(d);
  };
}

function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round()) offset = Math.round(offset);
  return function (d) {
    return +scale(d) + offset;
  };
}

function Tick(props) {
  const {
      value,
      x,
      k,
      tickSizeInner,
      spacing,
      orient,
      transform,
      position,
      format,
      color,
      gridSize,
    } = props,
    dy = orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em",
    line_props = {},
    text_props = { dy: dy };
  line_props[x + "2"] = k * tickSizeInner;
  text_props[x] = k * spacing;

  if (orient === left) {
    return (
      <Flex
        absolute
        l={0}
        t={position(value) - 4}
        r={gridSize}
        row
        justifyContent="flex-end"
        alignItems="center"
        zIndex={0}
      >
        <Flex>
          <Text
            font="caption"
            numberOfLiness={1}
            textAlign={
              orient === right ? "left" : orient === left ? "right" : "center"
            }
            {...text_props}
          >
            {format(value)}
          </Text>
        </Flex>
        <Flex bg={color} w={5} h={gridSize} ml={3} />
      </Flex>
    );
  }
  return (
    <Flex w={0.5} alignItems="center" zIndex={0} relative>
      <Flex bg={color} w={gridSize} h={5} />
      <Flex w={100}>
        <Text
          font="caption"
          textAlign={
            orient === right ? "left" : orient === left ? "right" : "center"
          }
          {...text_props}
        >
          {format(value)}
        </Text>
      </Flex>
    </Flex>
  );
}

function Axis(props) {
  const {
    scale,
    orient,
    ticks,
    tickValues,
    tickFormat,
    gridColor,
    height,
    gridSize,
  } = props;

  var transform = orient === top || orient === bottom ? translateX : translateY,
    values =
      tickValues == null
        ? scale.ticks
          ? scale.ticks.apply(scale, ticks)
          : scale.domain()
        : tickValues,
    format =
      tickFormat == null
        ? scale.tickFormat
          ? scale.tickFormat.apply(scale, ticks)
          : identity
        : tickFormat,
    position = (scale.bandwidth ? center : number)(scale.copy());

  if (orient === left) {
    const max = tickFormat
      ? tickFormat(Math.max(...values))
      : Math.max(...values);
    return (
      <Flex
        h={height}
        width={max.toString().length * 10}
        mr={-gridSize}
        pointerEvents="none"
        relative
      >
        {values.map((value, index) => {
          return (
            <Tick
              key={"tick-" + index}
              value={value}
              orient={orient}
              transform={transform}
              position={position}
              format={format}
              gridSize={gridSize}
              color={gridColor}
            />
          );
        })}

        <Flex h={height} w={gridSize} bg={gridColor} absolute t={0} r={0} />
      </Flex>
    );
  }

  return (
    <Flex w="100%" pointerEvents="none" mb="-13px">
      <Flex w="100%" h={gridSize} bg={gridColor} />
      <Flex w="100%" justifyContent="space-between" row>
        {values.map((value, index) => {
          return (
            <Tick
              key={"tick-" + index}
              value={value}
              orient={orient}
              transform={transform}
              position={position}
              format={format}
              gridSize={gridSize}
              color={gridColor}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

Axis.defaultProps = {
  tickArguments: [],
  tickValues: null,
  tickFormat: null,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  transform: "translate(0, 0)",
  gridSize: 0.75,
};

function AxisTop(props) {
  return <Axis orient={top} {...props} />;
}

function AxisRight(props) {
  return <Axis orient={right} {...props} />;
}

function AxisBottom(props) {
  return <Axis orient={bottom} {...props} />;
}

function AxisLeft(props) {
  return <Axis orient={left} {...props} />;
}

export { AxisTop, AxisRight, AxisBottom, AxisLeft };
