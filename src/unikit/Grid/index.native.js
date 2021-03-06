import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styled, { withThemeProps } from "../styled";
import { useLayout } from "../hooks";

const GridWrap = styled.View({
  position: "relative",
  flexDirection: "row",
  flexWrap: "wrap",
});

const GridItem = styled.View();

const Grid = withThemeProps(
  ({
    children,
    min = 250,
    max,
    gap = 5,
    outerGap = false,
    itemStyle = {},
    ...rest
  }) => {
    const { onLayout, width } = useLayout();
    const gridProps = {
      onLayout,
      ml: outerGap ? 0 : -gap / 2,
      mr: outerGap ? 0 : -gap / 2,
      p: outerGap ? gap / 2 : 0,
    };

    const getMax = () => {
      const childs = React.Children.count(children);
      let columns = Math.floor(width / min);
      if (columns < 1) columns = 1;
      if (max && columns > max) columns = max;
      if (columns > childs) columns = childs;
      const colWidth = 100 / columns;
      return colWidth && colWidth > 0 ? `${colWidth}%` : "100%";
    };

    const itemProps = {
      p: gap / 2,
      flex: 1,
      minWidth: min,
      maxWidth: getMax(),
    };

    return (
      <GridWrap wrap {...gridProps} {...rest}>
        {React.Children.toArray(children).map((child, i) => {
          if (child) {
            return (
              <GridItem key={i} style={itemStyle} {...itemProps}>
                {child}
              </GridItem>
            );
          }
        })}
      </GridWrap>
    );
  },
  "Grid"
);

Grid.propTypes = {
  children: PropTypes.node,
  min: PropTypes.number,
  max: PropTypes.number,
  gap: PropTypes.number,
  outerGap: PropTypes.bool,
  itemStyle: PropTypes.object,
};

Grid.defaultPropTypes = {
  min: 250,
  gap: 5,
  outerGap: false,
  itemStyle: {},
};

export default Grid;
