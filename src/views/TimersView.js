import React from "react";
import styled from "styled-components";
import Timer from "../components/generic/Timer";
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
