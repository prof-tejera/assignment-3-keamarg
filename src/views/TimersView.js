import React from "react";
import styled from "styled-components";
import Timer from "../components/generic/Timer";
import Navbar from "../components/generic/Navbar";
import TimerQueue from "../components/generic/TimerQueue";
import { COLORS, TIMERS } from "../utils/helpers";

// import Intro from "../components/generic/Intro";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 5rem;
  margin-left: 10rem;
`;

const Timers = styled.div``;

const Queue = styled.div`
  width: 20rem;
  flex-direction: column;
  align-self: flex-start;

  .${TIMERS.stopwatch} {
    background-color: ${COLORS.stopwatch};
  }
  .${TIMERS.countdown} {
    background-color: ${COLORS.countdown};
  }
  .${TIMERS.xy} {
    background-color: ${COLORS.xy};
  }
  .${TIMERS.tabata} {
    background-color: ${COLORS.tabata};
  }
  .empty {
    background-color: gray;
    opacity: 0.5;
  }
`;
// Using the react router to create navigation
const App = () => {
  const routes = [
    {
      path: "/",
      component: Timer,
    },
    {
      path: "/assignment-3-keamarg",
      component: Timer,
    },
    {
      path: "/Stopwatch",
      component: Timer,
    },
    {
      path: "/Countdown",
      component: Timer,
    },
    {
      path: "/XY",
      component: Timer,
    },
    {
      path: "/Tabata",
      component: Timer,
    },
  ];

  return (
    <Container>
      <Queue>
        <TimerQueue></TimerQueue>
      </Queue>
      <Timers>
        <Router>
          <Navbar />
          <Switch>
            {routes.map(({ path, component }, key) => (
              <Route exact path={path} component={component} key={key} />
            ))}
          </Switch>
        </Router>
      </Timers>
    </Container>
  );
};

export default App;
