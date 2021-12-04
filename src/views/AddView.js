import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { TIMERS, STATUS } from "../utils/helpers";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import { TimerContext } from "../TimerProvider";
import Button from "../components/generic/Button";
import { BTNTYPE, COLORS } from "../utils/helpers.js";
import { ReadyBtn, NotReadyBtn, PulseAnim2 } from "../utils/css.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AddPanel = styled.div`
  position: relative;
  height: 25rem;
  font-size: 0.8rem;
  .readyBtn {
    ${ReadyBtn}
  }
  ${PulseAnim2}

  .notReadyBtn {
    ${NotReadyBtn}
  }
`;

const Title = styled.h1`
  color: ${COLORS.text};
`;

const Selector = styled.select`
  border: 1px solid grey;
  border-style: outset;
  border-radius: 5px;
  padding: 0.2rem 1rem 0.2rem 1rem;
`;

const Add = () => {
  const { timerType, setTimerType } = useContext(TimerContext);
  const { time } = useContext(TimerContext);
  const { rounds } = useContext(TimerContext);
  const { rest } = useContext(TimerContext);
  const { timers, setTimers } = useContext(TimerContext);

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

  const handleClick = (e) => {
    console.log(e.target);
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
    const id = timers.length;
    console.log(timers);
    setTimers(() => [
      ...timers,
      { id, timerType, time, rounds, rest, status: STATUS.waiting },
    ]);
  };

  useEffect(() => {
    console.log(timerType);
  }, [timerType]);

  return (
    <Container>
      <Panel>
        <AddPanel className="text-center">
          <Title>Add timer</Title>
          <Selector
            name="timers"
            id="timers"
            value={timerType}
            onChange={handleChange}
          >
            <option value={TIMERS.stopwatch}>Stopwatch</option>
            <option value={TIMERS.countdown}>Countdown</option>
            <option value={TIMERS.xy}>XY</option>
            <option value={TIMERS.tabata}>Tabata</option>
          </Selector>
          <div className="text-center">
            <Settings></Settings>
          </div>
          {time > 0 && timerType !== TIMERS.tabata ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleClick}
            ></Button>
          ) : time > 0 && rest > 0 ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleClick}
            ></Button>
          ) : (
            <Button
              styleName="notReadyBtn"
              value={BTNTYPE.notReady}
              disabled={true}
            ></Button>
          )}
        </AddPanel>
      </Panel>
    </Container>
  );
};

export default Add;
