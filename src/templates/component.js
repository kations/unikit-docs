import "parse-prop-types";
import React from "react";
import * as unikit from "../unikit";

import { Flex, Page, H1, H2, Animate, Code, isWeb } from "../unikit";
import { Wrapper } from "../components";
import Table from "../components/Table";
import Playground from "../components/Playground";

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function App({ pageContext, route }) {
  const { title, code = "", from, scope } = pageContext || route.params || {};
  return (
    <Page scrollable={!isWeb}>
      <Wrapper>
        <Flex py={15}>
          <H1 animate>{title}</H1>
        </Flex>
        <Animate delay={250}>
          <Flex py={15}>
            <Code bg="primary" bgAlpha={0.1} p={20}>
              <Code color="primary">{`import`}</Code>
              {` { ${from} } from`}
              <Code color="primary">{` 'unikit'`}</Code>
            </Code>
          </Flex>
        </Animate>
        <Animate delay={250}>
          <Playground code={code} scope={{ Flex, [from]: unikit[from] }} />
        </Animate>
        <Flex py={15} mb={150}>
          <H2 delay={500} animate>
            Props
          </H2>
          <Animate delay={750}>
            <Table
              mt={15}
              component={from === "Input" ? unikit[from][title] : unikit[from]}
            />
          </Animate>
        </Flex>
      </Wrapper>
    </Page>
  );
}
