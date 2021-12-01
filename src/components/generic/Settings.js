import styled from "styled-components";
import { TIMERS } from "../../utils/helpers.js";
import PropTypes from "prop-types";
import { COLORS } from "../../utils/helpers.js";
import React, { useContext, useState, useEffect } from "react";
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
  width: 4.5rem;
  padding-left: 1.2rem;
  margin: 0.2rem;
`;

// const Credentials = styled.p`
//   font-size: 0.8rem;
//   color: ${COLORS.text};
//   padding-top: 0.5rem;
// `;

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

  const { setTime } = useContext(TimerContext);
  const { setRounds } = useContext(TimerContext);
  const { setRest } = useContext(TimerContext);
  const { docs } = useContext(TimerContext);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [restHours, setRestHours] = useState(0);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);

  //Timer handler
  const handleTimerChange = (e) => {
    if (!docs) {
      if (e.target.name === "hours") {
        setHours(e.target.value * 3600);
      }
      if (e.target.name === "minutes") {
        setMinutes(e.target.value * 60);
      }
      if (e.target.name === "seconds") {
        setSeconds(Number(e.target.value));
      }
    }
  };

  useEffect(() => {
    setTime(hours + minutes + seconds);
  }, [hours, minutes, seconds, setTime]);

  //Round handler
  const handleRoundChange = (e) => {
    if (!docs) {
      setRounds(e.target.value);
    }
  };

  //Rest handler
  const handleRestChange = (e) => {
    if (!docs) {
      if (e.target.name === "hours") {
        setRestHours(e.target.value * 3600);
      }
      if (e.target.name === "minutes") {
        setRestMinutes(e.target.value * 60);
      }
      if (e.target.name === "seconds") {
        setRestSeconds(Number(e.target.value));
      }
    }
  };

  useEffect(() => {
    setRest(restHours + restMinutes + restSeconds);
  }, [restHours, restMinutes, restSeconds, setRest]);

  return (
    <div className="w-75">
      <>
        <Text>
          <label htmlFor="hours">Set workout time</label>
        </Text>
        <SetInput
          name="hours"
          type="number"
          min="0"
          max="9"
          step="1"
          onChange={handleTimerChange}
          placeholder="H"
        ></SetInput>
        <SetInput
          name="minutes"
          type="number"
          min="0"
          max="59"
          step="1"
          onChange={handleTimerChange}
          placeholder="MM"
        ></SetInput>
        <SetInput
          name="seconds"
          type="number"
          min="0"
          max="59"
          step="1"
          onChange={handleTimerChange}
          placeholder="SS"
        ></SetInput>
      </>
      {timerType === TIMERS.xy || timerType === TIMERS.tabata ? (
        <>
          <Text>
            <label htmlFor="rounds">Set number of rounds</label>
          </Text>
          <SetInput
            name="rounds"
            type="number"
            min="1"
            max="10"
            step="1"
            onChange={handleRoundChange}
            placeholder="1-10"
          ></SetInput>
        </>
      ) : null}
      {props.timerType === TIMERS.tabata ? (
        <>
          <Text>
            <label htmlFor="rest">Set rest time</label>
          </Text>
          <SetInput
            name="hours"
            type="number"
            min="0"
            max="9"
            step="1"
            onChange={handleRestChange}
            placeholder="H"
          ></SetInput>
          <SetInput
            name="minutes"
            type="number"
            min="0"
            max="59"
            step="1"
            onChange={handleRestChange}
            placeholder="MM"
          ></SetInput>
          <SetInput
            name="seconds"
            type="number"
            min="0"
            max="59"
            step="1"
            onChange={handleRestChange}
            placeholder="SS"
          ></SetInput>
        </>
      ) : null}
      {/* <Credentials>By Martin Gundtoft</Credentials> */}
    </div>
  );
};

Settings.propTypes = {
  timerType: PropTypes.string,
};

export default Settings;
