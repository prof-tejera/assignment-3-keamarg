import React from "react";
import styled from "styled-components";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Navbar from "../components/generic/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Using the react router to create navigation
const App = () => {
  const routes = [
    {
      path: "/",
      component: Stopwatch,
    },
    {
      path: "/assignment-3-keamarg",
      component: Stopwatch,
    },
    {
      path: "/assignment-3-keamarg/Stopwatch",
      component: Stopwatch,
    },
    {
      path: "/assignment-3-keamarg/Countdown",
      component: Countdown,
    },
    {
      path: "/assignment-3-keamarg/XY",
      component: XY,
    },
    {
      path: "/assignment-3-keamarg/Tabata",
      component: Tabata,
    },
  ];

  return (
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
  );
};

export default App;
