import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { TIMERS } from "../utils/helpers";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import { TimerContext } from "../TimerProvider";
import Button from "../components/generic/Button";
import { BTNTYPE, COLORS } from "../utils/helpers.js";
import { ReadyBtn, NotReadyBtn } from "../utils/css.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AddPanel = styled.div`
  height: 25rem;
  font-size: 1rem;
  .readyBtn {
    ${ReadyBtn}
  }
  .notReadyBtn {
    ${NotReadyBtn}
  }
`;

const Title = styled.h1`
  color: ${COLORS.text};
`;

const Add = () => {
  const { timerType, setTimerType } = useContext(TimerContext);
  const { time } = useContext(TimerContext);
  const { rounds } = useContext(TimerContext);
  const { rest } = useContext(TimerContext);

  const handleChange = (e) => {
    switch (e.target.value) {
      case TIMERS.stopwatch:
        setTimerType(TIMERS.stopwatch);
        localStorage.setItem("timerType", "Stopwatch");
        break;
      case TIMERS.countdown:
        setTimerType(TIMERS.countdown);
        localStorage.setItem("timerType", "Countdown");
        break;
      case TIMERS.xy:
        setTimerType(TIMERS.xy);
        localStorage.setItem("timerType", "XY");
        break;
      case TIMERS.tabata:
        setTimerType(TIMERS.tabata);
        localStorage.setItem("timerType", "Tabata");
        break;
      default:
    }
  };

  useEffect(() => {
    console.log(timerType);
  }, [timerType]);

  console.log(
    "Type: " +
      timerType +
      " Time: " +
      time +
      " Rounds: " +
      rounds +
      " Rest: " +
      rest
  );
  return (
    <Container>
      <Panel>
        <AddPanel className="text-center">
          <Title>Add timer</Title>
          <select
            name="timers"
            id="timers"
            value={timerType}
            onChange={handleChange}
          >
            <option value={TIMERS.stopwatch}>Stopwatch</option>
            <option value={TIMERS.countdown}>Countdown</option>
            <option value={TIMERS.xy}>XY</option>
            <option value={TIMERS.tabata}>Tabata</option>
          </select>
          <div className="text-center">
            <Settings></Settings>
          </div>
          {time > 0 && timerType !== TIMERS.tabata ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.ready}
              // onClick={handleClickSettingsReady}
            ></Button>
          ) : rest > 0 ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.ready}
              // onClick={handleClickSettingsReady}
            ></Button>
          ) : (
            <Button
              styleName="notReadyBtn"
              value={BTNTYPE.notReady}
              disabled={true}
              // onClick={handleClickSettingsReady}
            ></Button>
          )}
        </AddPanel>
      </Panel>
    </Container>
  );
};

export default Add;
