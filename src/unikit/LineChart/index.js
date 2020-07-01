import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Svg from "react-native-svg";
import { scaleLinear } from "d3-scale";
import * as shape from "d3-shape";

import Flex from "../Flex";
import { useLayout } from "../hooks";
import Line from "./Line";
import Grid from "./Grid";
import Indicator from "./Indicator";
import Bars from "./Bars";
import Legend from "./Legend";
import { isNumber } from "../util";
import { AxisBottom, AxisLeft } from "./Axis";

const getValue = (d, key) => {
  if (d[key] !== undefined && d[key] !== null && isNumber(d[key])) {
    return d[key];
  } else if (d && isNumber(d)) {
    return d;
  } else {
    return 0;
  }
};

const getDomain = (domain) => [Math.min(...domain), Math.max(...domain)];

const getDomainY = ({ data, keys }) => {
  const domain = [];

  data.map((d) => {
    keys.map((key) => {
      let value = getValue(d, key);
      if (value !== undefined && isNumber(value)) {
        domain.push(value);
      }
    });
  });
  return getDomain(domain);
};

const Chart = (props) => {
  const {
    data,
    keys,
    keyProps,
    height,
    indicator,
    dots,
    contentInset = { bottom: 10, top: 10, left: 0, right: 0 },
    xAxis,
    yAxis,
    grid,
    legend,
    formatX,
    formatY,
    yDomain,
    yTicks,
    scrollable,
    minChartWidth,
    ...rest
  } = props;
  const { onLayout, width } = useLayout();

  const w = minChartWidth || width;
  const scroll = scrollable;

  const scaleY = React.useMemo(
    () =>
      scaleLinear()
        .domain(yDomain || getDomainY({ data, keys }))
        .range([height - contentInset.bottom, contentInset.top]),
    [data, keys, width, minChartWidth]
  );

  const scaleX = React.useMemo(
    () =>
      scaleLinear()
        .domain(getDomain(data.map((d, i) => i)))
        .range([contentInset.left, width - contentInset.right]),
    [data, keys, width, minChartWidth]
  );

  const wrapProps = scroll
    ? {
        contentContainerStyle: { flexGrow: 1 },
        style: {
          position: "relative",
          zIndex: 300,
          overflow: "visible",
          width: width,
        },
        horizontal: true,
        showsHorizontalScrollIndicator: false,
      }
    : {};
  const WrapComp = scroll ? ScrollView : React.Fragment;

  return (
    <>
      <Flex
        pt={scroll ? 5 : 0}
        pb={xAxis ? 15 : 0}
        overflow={scroll ? "hidden" : "visible"}
        {...rest}
      >
        <Flex h={height} row>
          {yAxis && (
            <AxisLeft
              height={height}
              scale={scaleY}
              contentInset={contentInset}
              ticks={[yTicks]}
              tickFormat={(d) => {
                if (formatY) return formatY(d);
                return d;
              }}
              {...props}
            />
          )}
          <WrapComp {...wrapProps}>
            <Flex flex={1} minWidth={minChartWidth} zIndex={300} relative>
              <Flex flex={1} h={height} onLayout={onLayout} relative>
                <Svg
                  style={[
                    StyleSheet.absoluteFill,
                    { width: "100%", height: height },
                  ]}
                >
                  {grid ? (
                    <Grid
                      width={width}
                      scale={scaleY}
                      ticks={[yTicks]}
                      {...props}
                    />
                  ) : null}

                  {width > 0 &&
                    keys.map((key) => {
                      const customProps = keyProps[key] || {};
                      if (customProps.type === "bar") {
                        return (
                          <Bars
                            width={width}
                            scaleX={scaleX}
                            scaleY={scaleY}
                            objKey={key}
                            {...props}
                            {...customProps}
                          />
                        );
                      }

                      return (
                        <Line
                          width={width}
                          scaleX={scaleX}
                          scaleY={scaleY}
                          objKey={key}
                          {...props}
                          {...customProps}
                        />
                      );
                    })}
                </Svg>

                {(width > 0 && indicator) || (width > 0 && dots) ? (
                  <Indicator
                    width={width}
                    scaleX={scaleX}
                    scaleY={scaleY}
                    contentInset={contentInset}
                    {...props}
                  />
                ) : null}
              </Flex>
              {xAxis && (
                <AxisBottom
                  scale={scaleX}
                  tickFormat={(d) => {
                    if (!data[d]) return "";
                    if (formatX) {
                      return formatX(data[d]);
                    }
                    return data[d].label || d;
                  }}
                  {...props}
                />
              )}
            </Flex>
          </WrapComp>
        </Flex>
      </Flex>
      {legend && <Legend {...props} />}
    </>
  );
};

Chart.defaultProps = {
  curve: shape.curveBasis,
  strokeWidth: 1,
  data: [],
  keys: ["value"],
  keyProps: {},
  hideValueOnBlur: true,
  showValue: false,
  valuePosition: "top",
  animated: true,
  color: "primary",
  gradient: true,
  shadow: true,
  shadowOpacity: 0.2,
  indicator: true,
  dots: true,
  dotsWithValue: true,
  valueOffset: 10,
  springConfig: {},
  grid: true,
  yTicks: 3,
  gridColor: "border",
  gridOffset: 0,
  xAxis: false,
  yAxis: false,
  zeroLine: false,
  gridSize: 0.5,
  legend: false,
  scrollable: false,
};

export default Chart;
