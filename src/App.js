import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "./TimerProvider";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
// import { TIMERS } from "./utils/helpers";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

// Clichandler for setting a variable, that helps avoid problems when clicking on components in the docs view
const App = () => {
  const { setDocs } = useContext(TimerContext);
  const { setIntro } = useContext(TimerContext);

  // const { setTimerType } = useContext(TimerContext);

  const handleClick = (e) => {
    // setTimerType(TIMERS.stopwatch);
    if (e.target.innerHTML === "Documentation") {
      setDocs(true);
    } else {
      setDocs(false);
    }
    if (e.target.innerHTML === "Timers") {
      setIntro(true);
    }
    if (e.target.innerHTML === "Add") {
    }
  };

  return (
    <Container>
      <Router>
        <nav>
          <ul>
            <li id="timers" onClick={handleClick}>
              <Link to="/">Timers</Link>
            </li>
            <li value="docs" onClick={handleClick}>
              <Link to="/docs">Documentation</Link>
            </li>
            <li value="add" onClick={handleClick}>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/add">
            <AddView />
          </Route>
          <Route path="/docs">
            <DocumentationView />
          </Route>
          <Route path="/">
            <TimersView />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
