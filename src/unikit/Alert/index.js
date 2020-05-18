import React, { useState, useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";
import * as PropTypes from "prop-types";

import styled, { withThemeProps } from "../styled";
import Icon from "../Icon";
import Button from "../Button";
import Animate from "../Animate";

const Container = styled.View(({ from, gap }) => ({
  position: Platform.OS === "web" ? "fixed" : "absolute",
  left: 0,
  bottom: from === "bottom" ? 0 : "auto",
  top: from === "top" ? 0 : "auto",
  width: "100%",
  zIndex: 9999,
  paddingHorizontal: gap,
}));

const Message = ({ children, timeout, removeItem, key, ...rest }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        removeItem();
      }, 500);
    }, timeout);
  }, []);

  return (
    <Animate
      key={key}
      from={{ y: -100, o: 0 }}
      to={{ y: 0, o: 1 }}
      w="auto"
      isVisible={visible}
      flexCenter
      {...rest}
    >
      {children}
    </Animate>
  );
};

let id = 0;

const Alert = withThemeProps(
  ({
    theme,
    alert,
    timeout = 2000,
    from = "top",
    gap = 15,
    maxWidth = 700,
    offset = 20,
    onAlert,
    onFeedback,
    ...rest
  }) => {
    const [items, setItems] = useState([]);

    // const transitions = useTransition(items, (items) => items.key, {
    //   from: { opacity: 0, top: from === "bottom" ? 30 : -30 },
    //   enter: { opacity: 1, top: 0 },
    //   leave: { opacity: 0, top: from === "bottom" ? 30 : -30 },
    //   onRest: (item) =>
    //     setTimeout(() => {
    //       setItems((state) => state.filter((i) => i.key !== item.key));
    //     }, item.timeout || timeout),
    // });

    useEffect(() => {
      if (alert) {
        if (from === "bottom") {
          setItems((state) => [...state, { key: id++, ...alert }]);
        } else {
          setItems((state) => [{ key: id++, ...alert }, ...state]);
        }
        if (onAlert) onAlert(alert);
        if (onFeedback) onFeedback(alert.type);
      }
    }, [alert, from]);

    return (
      <Container
        from={from}
        gap={gap}
        py={gap / 2 + offset}
        pointerEvents="box-none"
        {...rest}
      >
        {from === "top" ? <SafeAreaView collapsable={false} /> : null}
        {items.map((item, index) => (
          <Message
            my={gap / 2}
            removeItem={() => {
              const newItems = items.filter((i) => i.key !== item.key);
              setItems(newItems);
            }}
            timeout={timeout}
            key={item.key}
          >
            <Button
              w="auto"
              maxWidth={maxWidth}
              bg={item.type || "surface"}
              renderRight={
                <Icon
                  name="x"
                  bgAware={theme.colors[item.type] || item.type}
                  size={20}
                  ml={gap}
                  bgAware={item.type || "surface"}
                  onPress={(e) => {
                    e.stopPropagation();
                    setItems((state) =>
                      state.filter((i) => i.key !== item.key)
                    );
                  }}
                />
              }
            >
              {item.message}
            </Button>
          </Message>
        ))}
        {/* {from === "bottom" ? <SafeAreaView collapsable={false} /> : null} */}
      </Container>
    );
  },
  "Alert"
);

Alert.propTypes = {
  alert: PropTypes.object,
  timeout: PropTypes.number,
  from: PropTypes.string,
  gap: PropTypes.number,
  maxWidth: PropTypes.number,
  onAlert: PropTypes.func,
};

Alert.defaultPropTypes = {
  timeout: 2000,
  from: "top",
  gap: 15,
  maxWidth: 700,
};

export default Alert;
