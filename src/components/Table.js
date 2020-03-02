import React from "react";
import parsePropTypes from "parse-prop-types";
import { Flex, Text } from "../unikit";

const getDefaultValue = value => {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return value;
};

export default function Table({ component, ...rest }) {
  const types = parsePropTypes(component);
  return (
    <Flex w="100%" {...rest}>
      <Flex bg="primary" alpha={0.05} p={20} py={10} mt={3} w="100%" row>
        <Flex flex={1}>
          <Text>Name</Text>
        </Flex>
        <Flex flex={1}>
          <Text>Type</Text>
        </Flex>
        <Flex flex={1}>
          <Text>Default</Text>
        </Flex>
      </Flex>
      {Object.keys(types).map(key => {
        const { type, required, defaultValue } = types[key];
        return (
          <Flex bg="primary" alpha={0.1} p={20} mt={3} w="100%" row>
            <Flex flex={1}>
              <Text color="primary">{key}</Text>
            </Flex>
            <Flex flex={1}>
              <Text>
                {type.name}{" "}
                <Text font="label" color="text" opacity={0.5}>
                  {required ? "required" : ""}
                </Text>
              </Text>
            </Flex>
            <Flex flex={1}>
              <Text>
                {defaultValue ? getDefaultValue(defaultValue.value) : ""}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
