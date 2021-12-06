import React, { useContext } from "react";
import styled from "styled-components";
import { BTNTYPE, COLORS, TIMERS, STATUS } from "../utils/helpers";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import TimerQueue from "../components/generic/TimerQueue";
import { TimerContext } from "../TimerProvider";
import Button from "../components/generic/Button";
import { ReadyBtn, NotReadyBtn, PulseAnim2, QueueStyle } from "../utils/css.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 5rem;
  margin-left: 10rem;
`;

const Queue = styled.div`
.${QueueStyle}
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

const Text = styled.h1`
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
    const id = timers.length;
    if (timers.length < 8) {
      setTimers(() => [
        ...timers,
        { id, timerType, time, rounds, rest, status: STATUS.notRunning },
      ]);
      localStorage.setItem("timerQueue", JSON.stringify(timers));
    }
  };

  return (
    <Container>
      <Queue>
        <TimerQueue> </TimerQueue>
      </Queue>
      <Panel timerType={timerType}>
        <AddPanel className="text-center">
          <Text>Add timer</Text>
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
          {time > 0 && timerType !== TIMERS.tabata && timers.length < 8 ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleClick}
            ></Button>
          ) : time > 0 && rest > 0 && timers.length < 8 ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleClick}
            ></Button>
          ) : timers.length > 7 ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.queue}
              onClick={handleClick}
            ></Button>
          ) : (
            <Button
              styleName="notReadyBtn"
              value={BTNTYPE.notReady}
              disabled={true}
            ></Button>
          )}
          {timers.length > 7 ? <Text>Limit reached</Text> : null}
        </AddPanel>
      </Panel>
    </Container>
  );
};

export default Add;
