import React, { Fragment, useState } from "react";
import * as unikit from "../unikit";

import {
  Flex,
  Button,
  Input,
  Form,
  Page,
  H1,
  B,
  H3,
  H4,
  H5,
  P,
  Code,
  Grid,
  isWeb,
  isAndroid,
  Animate,
} from "../unikit";
import { WheelPicker } from "../unikit/Input/DatePicker";
import { Wrapper, Link } from "../components";
import Playground from "../components/Playground";
import { pages } from "../../pages";
import { useInterval } from "../unikit/hooks";
import { Platform } from "react-native";

const getComponentsByGroup = (array, group) => {
  return array.filter((item) => item.group === group);
};

export default function App() {
  const [vis, setVis] = useState(500);
  const groups = ["UI", "Inputs", "Primitives"];

  //if (Platform.OS === "ios") return null;

  // useInterval(() => {
  //   setVis(vis / 2);
  // }, 3000);

  // return (
  //   <Fragment>
  //     <Animate bg="primary" w={100} h={100} />
  //     <Input.Switch />
  //   </Fragment>
  // );

  return (
    <Page scrollable={!isWeb}>
      {isWeb ? (
        <Flex py={150}>
          <Wrapper align="center">
            <H1 style={{ fontSize: "4rem" }} bold>
              Universal
            </H1>
            <H1 mt={-5} style={{ fontSize: "4rem" }} bold animate>
              Components
            </H1>
            <Animate delay={50}>
              <P mt={30} maxWidth={600} textAlign="center">
                build responsive and accessible mobile-first projects for web
                and native with an easy to use component library.
              </P>
            </Animate>
          </Wrapper>
        </Flex>
      ) : null}
      <Wrapper mb={100}>
        <H3 style={{ fontWeight: "bold" }}>Getting started</H3>
        <Animate delay={250}>
          <Flex py={15}>
            <Code bg="primary" bgAlpha={0.1} p={20}>
              <Code color="primary">{`yarn add`}</Code>
              {` unikit styled-components react-native-svg react-native-reanimated`}
            </Code>
          </Flex>
          <P>For use with react-native you need to install react-native-svg</P>
        </Animate>
      </Wrapper>
      <Wrapper>
        {groups.map((group) => {
          return (
            <Fragment key={group}>
              <H3 bold>{group}</H3>
              <Grid mt={10} mb={75} min={200} gap={20}>
                {getComponentsByGroup(pages, group)
                  .sort((a, b) => a.title > b.title)
                  .map(({ title, path, smallCode }) => {
                    return (
                      <Link to={path}>
                        <Animate delay={500}>
                          <Flex
                            bg="primary"
                            bgAlpha={0.1}
                            w="100%"
                            height={150}
                            align="center"
                            justify="center"
                            overflow="hidden"
                          >
                            <Playground
                              code={smallCode}
                              scope={{ Flex, [title]: unikit[title] }}
                              clean
                            />
                          </Flex>
                          <Flex
                            bg="surface"
                            bg="primary"
                            bgAlpha={0.05}
                            px={20}
                            py={12}
                          >
                            <H5 my={5}>{title}</H5>
                          </Flex>
                        </Animate>
                      </Link>
                    );
                  })}
              </Grid>
            </Fragment>
          );
        })}
      </Wrapper>
    </Page>
  );
}
