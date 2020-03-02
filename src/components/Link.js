import React from "react";
import { Link } from "gatsby";
import { useNavigation } from "@react-navigation/native";
import { isWeb, Touchable } from "../unikit";

const WebLink = ({ to, children }) => {
  return <Link to={to}>{children}</Link>;
};

const NativeLink = ({ to, children }) => {
  const navigation = useNavigation();
  return (
    <Touchable onPress={() => navigation.push(to.replace("/", ""))}>
      {children}
    </Touchable>
  );
};

export default function UniLink(props) {
  if (isWeb) {
    return <WebLink {...props} />;
  } else {
    return <NativeLink {...props} />;
  }
}
