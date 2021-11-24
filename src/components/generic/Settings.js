import styled from "styled-components";
import { INPUTS, TIMERS, timerValue } from "../../utils/helpers.js";
import PropTypes from "prop-types";
import { COLORS } from "../../utils/helpers.js";
import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";

const SetInput = styled.input`
  // border: 1px solid black;
  color: ${(props) =>
    props.type === TIMERS.stopwatch
      ? COLORS.stopwatch
      : props.type === TIMERS.countdown
      ? COLORS.countdown
      : props.type === TIMERS.xy
      ? COLORS.xy
      : COLORS.tabata};
  font-size: 0.8rem;
  border-radius: 0.5rem;
  border: 0px;
`;

const Credentials = styled.p`
  font-size: 0.8rem;
  color: ${COLORS.text};
  padding-top: 0.5rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: ${COLORS.text};
  padding-top: 0.5rem;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Settings = (props) => {
  const { timerType } = props;

  Settings.defaultProps = {
    timerType: TIMERS.countdown,
  };

  const { time, setTime } = useContext(TimerContext);
  const { rounds, setRounds } = useContext(TimerContext);
  const { rest, setRest } = useContext(TimerContext);
  const { docs } = useContext(TimerContext);

  //Changehandler for all settings
  const handleChange = (e) => {
    if (!docs) {
      if (e.target.name === INPUTS.timer) {
        setTime(e.target.value);
      } else if (e.target.name === INPUTS.rounds) {
        setRounds(e.target.value);
      } else {
        setRest(e.target.value);
      }
    }
  };

  return (
    <div className="w-75">
      {timerType !== TIMERS.stopwatch ? (
        <>
          <Text>
            <label htmlFor="timer">Set workout time</label>
            <br />
            {timerValue(time)}
          </Text>
          <SetInput
            name="timer"
            type="range"
            min="0"
            max="7200"
            step="15"
            value={time}
            onChange={handleChange}
          ></SetInput>
        </>
      ) : null}
      {timerType === TIMERS.xy || timerType === TIMERS.tabata ? (
        <>
          <Text>
            <label htmlFor="rounds">Set number of rounds</label>
            <br />
            {rounds}
          </Text>
          <SetInput
            name="rounds"
            type="range"
            min="1"
            max="5"
            step="1"
            value={rounds}
            onChange={handleChange}
          ></SetInput>
        </>
      ) : null}
      {props.timerType === TIMERS.tabata ? (
        <>
          <Text>
            <label htmlFor="rest">Set rest time</label>
            <br />
            {timerValue(rest).substr(4, 6)}
          </Text>
          <SetInput
            name="rest"
            type="range"
            min="0"
            max="300"
            step="5"
            value={rest}
            onChange={handleChange}
          ></SetInput>
        </>
      ) : null}
      <Credentials>By Martin Gundtoft</Credentials>
    </div>
  );
};

Settings.propTypes = {
  timerType: PropTypes.string,
};

export default Settings;
