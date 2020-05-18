import "parse-prop-types";
import React from "react";
import * as unikit from "../unikit";

import { Flex, Page, H1, H3, Animate, Code, isWeb, isAndroid } from "../unikit";
import { Wrapper } from "../components";
import Table from "../components/Table";
import Playground from "../components/Playground";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function App({ pageContext, route }) {
  const { title, code = "", from, scope } = pageContext || route.params || {};
  const AniComp = isAndroid ? Flex : Animate;
  return (
    <Page scrollable={!isWeb}>
      <Wrapper>
        <Flex py={15}>
          <H1 animate bold>
            {title}
          </H1>
        </Flex>
        <AniComp delay={250}>
          <Flex py={15}>
            <Code bg="primary" bgAlpha={0.1} p={20}>
              <Code color="primary">{`import`}</Code>
              {` { ${from} } from`}
              <Code color="primary">{` 'unikit'`}</Code>
            </Code>
          </Flex>
        </AniComp>
        <AniComp delay={250}>
          <Playground code={code} scope={{ Flex, [from]: unikit[from] }} />
        </AniComp>
        <Flex py={15} mb={150}>
          <H3 delay={500} bold animate>
            Props
          </H3>
          <AniComp delay={500}>
            <Table
              mt={15}
              component={from === "Input" ? unikit[from][title] : unikit[from]}
            />
          </AniComp>
        </Flex>
      </Wrapper>
    </Page>
  );
}
