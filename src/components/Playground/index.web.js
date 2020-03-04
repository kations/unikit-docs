import React, { Fragment, useState, useRef } from "react";
import { LiveProvider, withLive, LiveEditor } from "react-live";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "./Playground.css";

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
  Tabs,
  useInterval,
  isWeb
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
      {isWeb ? (
        <Flex bg="#1C182C" p={10}>
          <Editor
            value={string}
            onValueChange={text => {
              setString(text);
              onChange(text);
            }}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              background: "#1C182C",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              color: "#E2DCF2",
              fontSize: "1rem"
            }}
          />
        </Flex>
      ) : null}
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
        Tabs,
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
