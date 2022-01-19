import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { timerValue, COLORS } from "../../utils/helpers.js";

const Display = styled.label`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 300;
  // font-family: "Orbitron", sans-serif;
  #minutes,
  #seconds {
    display: inline-block;
    width: 6rem;
  }
  #hours {
    display: inline-block;
    width: 5rem;
  }
  #deciSeconds {
    display: inline-block;
    width: 1rem;
    font-size: 1rem;
  }
`;

const DisplayTime = () => {
  const { time } = useContext(TimerContext);
  const { currentRest } = useContext(TimerContext);

  return (
    <Display style={{ color: `${currentRest ? COLORS.stop : COLORS.text}` }}>
      <span id="hours">{timerValue(time, true).slice(0, 1)}h</span>
      <span id="minutes">{timerValue(time, true).slice(1, 2)}m</span>
      <span id="seconds">{timerValue(time, true).slice(2, 3)}s</span>
    </Display>
  );
};

export default DisplayTime;
