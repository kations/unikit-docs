import React, { Fragment, useState, useRef } from "react";
import { LiveProvider, withLive, LiveEditor } from "react-live";

import {
  Flex,
  Box,
  Text,
  Headline,
  Grid,
  Group,
  Form,
  Input,
  Button,
  useInterval
} from "../../unikit";
import icons from "../../unikit/Icon/icons";

// import prettier from "@miksu/prettier/lib/standalone";
// import parsers from "@miksu/prettier/lib/language-js/parser-babylon";
// prettier.format(string, {
//   parser: "babel",
//   plugins: [parsers]
// })

const LiveNative = ({ live: { error, code, element, onChange }, clean }) => {
  const [string, setString] = useState(code);
  const Comp = element;
  if (clean) return <Comp />;
  return (
    <Flex>
      <Flex bg="primary" alpha={0.1} px={20} py={30}>
        {error ? null : <Comp />}
      </Flex>
    </Flex>
  );
};

const WrappedEditor = withLive(LiveNative);

export default function Table({ code, scope, ...rest }) {
  return (
    <LiveProvider
      code={code}
      scope={{
        Fragment,
        Box,
        Flex,
        Text,
        Grid,
        Headline,
        Group,
        Form,
        Input,
        Button,
        useInterval,
        useState,
        useRef,
        icons,
        ...scope
      }}
    >
      <WrappedEditor {...rest} />
    </LiveProvider>
  );
}
