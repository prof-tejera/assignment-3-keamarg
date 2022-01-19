import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import DisplayTime from "../components/generic/DisplayTime";
import Panel from "../components/generic/Panel";
// import Timer from "../components/generic/Timer";
import Settings from "../components/generic/Settings";
import Navbar from "../components/generic/Navbar";
import IntroOutro from "../components/generic/IntroOutro";
import TimerQueue from "../components/generic/TimerQueue";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
        <DocumentComponent
          title="Button"
          component={<Button />}
          propDocs={[
            {
              prop: "styleName",
              description: "Has the classNames",
              type: "String",
              defaultValue: "none",
            },
            {
              prop: "value",
              description: "Has the button type",
              type: "String",
              defaultValue: "none",
            },
            {
              prop: "onClick",
              description: "Has the clickHandler function",
              type: "function",
              defaultValue: "null",
            },
            {
              prop: "inner",
              description: "Has the text for the btn name",
              type: "String",
              defaultValue: "",
            },
            {
              prop: "disabled",
              description: "Is the button disabled?",
              type: "Bool",
              defaultValue: "false",
            },
          ]}
        />

        <DocumentComponent
          title="IntroOutro"
          component={<IntroOutro />}
          propDocs={[{}]}
        />
        <DocumentComponent
          title="DisplayTime"
          component={<DisplayTime />}
          propDocs={[{}]}
        />

        <DocumentComponent
          title="Panel"
          component={<Panel />}
          propDocs={[
            {
              prop: "timerType",
              description: "Has the type of timer",
              type: "String",
              defaultValue: "myClass",
            },
          ]}
        />
        <DocumentComponent
          title="Settings"
          component={<Settings />}
          propDocs={[]}
        />
        <DocumentComponent
          title="Timer"
          //The Timer component is outcommented, as the DocumentationView kept blowing up due to a useEffect in Timer, where I referenced "props.match.path", you can outcomment the line below and the timer import at the top to see what I mean.
          // component={<Timer />}
          propDocs={[
            {
              prop: "timerType",
              description: "Has the type of timer",
              type: "String",
              defaultValue: "Countdown",
            },
          ]}
        />
        <DocumentComponent
          title="Navbar"
          component={<Navbar />}
          propDocs={[]}
        />
        <DocumentComponent
          title="TimerQueue"
          component={<TimerQueue />}
          propDocs={[]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
