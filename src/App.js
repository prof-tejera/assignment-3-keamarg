import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "./TimerProvider";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

// Clichandler for setting a variable, that helps avoid problems when clicking on components in the docs view
const App = () => {
  const handleClick = (e) => {
    if (e.target.innerHTML === "Documentation") {
      setDocs(true);
    } else {
      setDocs(false);
    }
  };
  const { setDocs } = useContext(TimerContext);

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
          </ul>
        </nav>
        <Switch>
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
