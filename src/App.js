import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "./TimerProvider";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
// import { TIMERS } from "./utils/helpers";

const Container = styled.div`
  background: rgb(63, 162, 224);
  background: linear-gradient(
    118deg,
    rgba(63, 162, 224, 0.7203256302521008) 0%,
    rgba(49, 110, 148, 0.639093137254902) 35%,
    rgba(224, 187, 52, 0.577468487394958) 68%,
    rgba(78, 19, 148, 0.5802696078431373) 96%
  );
  height: 100vh;
  overflow: auto;
`;
const Navigation = styled.nav`
  margin-bottom: 5rem;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #ddd;
  }

  li a.active {
    color: white;
    background-color: #04aa6d;
  }
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
        <Navigation>
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
        </Navigation>
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
