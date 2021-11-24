import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { timerValue } from "../../utils/helpers.js";

const Display = styled.label`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 300;
  // font-family: "Orbitron", sans-serif;
  color: white;
`;

const DisplayTime = () => {
  const { time } = useContext(TimerContext);

  return <Display>{timerValue(time)}</Display>;
};

export default DisplayTime;
