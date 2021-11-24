import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import { NavLink } from "react-router-dom";
import { COLORS, TIMERS } from "../../utils/helpers";
import styled from "styled-components";

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0.5rem 0;
  overflow: hidden;
  border-radius: 0.3rem 0.3rem 0rem 0rem;
  width: 20rem;

  a {
    color: ${COLORS.text};
    text-decoration: none;
  }
  .Stopwatch,
  .Countdown,
  .XY,
  .Tabata {
    background-color: ${COLORS.nav};
    transition: 0.5s;
  }
  .Stopwatch:hover {
    background-color: ${COLORS.stopwatch};
  }
  .Countdown:hover {
    background-color: ${COLORS.countdown};
  }
  .Tabata:hover {
    background-color: ${COLORS.tabata};
  }
  .XY:hover {
    background-color: ${COLORS.xy};
  }

  li {
    display: inline;
    list-style-type: none;
    text-decoration: none;
    padding: 0.75rem;
  }
  .current {
    .Stopwatch {
      background-color: ${COLORS.stopwatch};
    }
    .Countdown {
      background-color: ${COLORS.countdown};
    }
    .XY {
      background-color: ${COLORS.xy};
    }
    .Tabata {
      background-color: ${COLORS.tabata};
    }
  }
  .active {
    background-color: #04aa6d;
  }
`;

const links = [
  { name: TIMERS.stopwatch, path: "/" },
  { name: TIMERS.countdown, path: "/countdown" },
  { name: TIMERS.xy, path: "/xy" },
  { name: TIMERS.tabata, path: "/tabata" },
];

// The navbar is used to set the initial states for the different timers
const Navbar = () => {
  const { setTime } = useContext(TimerContext);
  const { setRounds } = useContext(TimerContext);
  const { setRest } = useContext(TimerContext);
  const { setIsRunning } = useContext(TimerContext);
  const { setBtnState } = useContext(TimerContext);
  const { setSettingsState } = useContext(TimerContext);
  const { docs } = useContext(TimerContext);
  const { setCurrentRound } = useContext(TimerContext);
  const { setShowSettingsMessage } = useContext(TimerContext);
  const { setShowTimerRounds } = useContext(TimerContext);
  const { setShowMessage } = useContext(TimerContext);
  const { setSavedTime } = useContext(TimerContext);

  // Click handler for the navbar
  const handleClick = (e) => {
    if (!docs) {
      setTime(0);
      setRounds(0);
      setRest(0);
      setIsRunning(false);
      setBtnState(true);
      setSettingsState(true);
      setCurrentRound(0);
      setShowSettingsMessage(false);
      setShowMessage(false);
      setSavedTime(0);

      if (e.target.innerHTML === "Stopwatch") {
        setShowTimerRounds(true);
      }
    }
  };

  return (
    <NavList>
      {links.map((link, index) => (
        <NavLink key={index} to={link.path} exact activeClassName="current">
          <li className={link.name} onClick={handleClick}>
            {link.name}
          </li>
        </NavLink>
      ))}
    </NavList>
  );
};
export default Navbar;
