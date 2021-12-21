import styled from "styled-components";
import { TIMERS } from "../../utils/helpers.js";
import { COLORS } from "../../utils/helpers.js";
import React, { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../TimerProvider";

const SetInput = styled.input`
  // border: 1px solid black;
  font-size: 0.8rem;
  border-radius: 0.5rem;
  border: 0px;
  width: 4rem;
  padding-left: 1rem;
  margin: 0.2rem;
  border: 1px solid grey;
  border-style: outset;
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
`;
const Text = styled.p`
  font-size: 1rem;
  color: ${COLORS.text};
  padding-top: 0.5rem;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Settings = () => {
  const { setTime } = useContext(TimerContext);
  const { setRounds } = useContext(TimerContext);
  const { setRest } = useContext(TimerContext);
  const { docs } = useContext(TimerContext);
  const { timerType } = useContext(TimerContext);
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
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 9;
          }
        }
        setHours(Number(e.target.value * 3600));
      }
      if (e.target.name === "minutes") {
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 59;
          }
        }
        setMinutes(Number(e.target.value * 60));
      }
      if (e.target.name === "seconds") {
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 59;
          }
        }
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
      if (!e.target.checkValidity()) {
        if (e.target.value < 1) {
          e.target.value = 1;
        } else {
          e.target.value = 9;
        }
      }
      setRounds(Number(e.target.value));
    }
  };

  //Rest handler
  const handleRestChange = (e) => {
    if (!docs) {
      if (e.target.name === "hours") {
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 9;
          }
        }
        setRestHours(Number(e.target.value * 3600));
      }
      if (e.target.name === "minutes") {
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 59;
          }
        }
        setRestMinutes(Number(e.target.value * 60));
      }
      if (e.target.name === "seconds") {
        if (!e.target.checkValidity()) {
          if (e.target.value < 0) {
            e.target.value = 0;
          } else {
            e.target.value = 59;
          }
        }
        setRestSeconds(Number(e.target.value));
      }
    }
  };

  useEffect(() => {
    setRest(restHours + restMinutes + restSeconds);
  }, [restHours, restMinutes, restSeconds, setRest]);

  // Inputs will not work on mobile with onKeyDown, preventing keyboard input
  return (
    <div className="w-100">
      <>
        <Text>
          <label htmlFor="hours">Set workout time</label>
        </Text>
        <SetInput
          // onKeyDown={(e) => e.preventDefault()}
          name="hours"
          type="number"
          min="0"
          max="9"
          step="1"
          onChange={handleTimerChange}
          placeholder="H"
        ></SetInput>
        <SetInput
          // onKeyDown={(e) => e.preventDefault()}
          name="minutes"
          type="number"
          min="0"
          max="59"
          step="1"
          onChange={handleTimerChange}
          placeholder="MM"
        ></SetInput>
        <SetInput
          // onKeyDown={(e) => e.preventDefault()}
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
      {timerType === TIMERS.tabata ? (
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

// Settings.propTypes = {
//   timerType: PropTypes.string,
// };

export default Settings;
