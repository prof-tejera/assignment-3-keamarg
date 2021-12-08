import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BTNTYPE, COLORS, TIMERS, STATUS } from "../utils/helpers";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import TimerQueue from "../components/generic/TimerQueue";
import { TimerContext } from "../TimerProvider";
import Button from "../components/generic/Button";
import {
  ReadyBtn,
  NotReadyBtn,
  QueueBtn,
  PulseAnim2,
  PulseAnim3,
  QueueStyle,
} from "../utils/css.js";
import { useHistory } from "react-router";

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
  height: 27.5rem;
  font-size: 0.8rem;
  .readyBtn {
    ${ReadyBtn}
  }
  .notReadyBtn {
    ${NotReadyBtn}
  }
  .queueBtn {
    ${QueueBtn}
  }
  ${PulseAnim2}
  ${PulseAnim3}
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
  const { setInQueue } = useContext(TimerContext);
  const { setIntro } = useContext(TimerContext);

  const limit = 9;
  const history = useHistory();

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

  const handleAddClick = () => {
    const id = timers.length;
    if (timers.length < limit) {
      setTimers(() => [
        ...timers,
        { id, timerType, time, rounds, rest, status: STATUS.notRunning },
      ]);
    }
    console.log(timers);
  };

  useEffect(() => {
    localStorage.setItem("timerQueue", JSON.stringify(timers));
  }, [timers]);

  const handleQueueClick = () => {
    setInQueue(true);
    setIntro(true);
    history.push(`/`);
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
          {time > 0 && timerType !== TIMERS.tabata && timers.length < limit ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleAddClick}
            ></Button>
          ) : time > 0 && rest > 0 && timers.length < limit ? (
            <Button
              styleName="readyBtn"
              value={BTNTYPE.add}
              onClick={handleAddClick}
            ></Button>
          ) : timers.length > limit - 1 ? (
            <Button
              styleName="notReadyBtn"
              value={BTNTYPE.limit}
              disabled={true}
            ></Button>
          ) : (
            <Button
              styleName="notReadyBtn"
              value={BTNTYPE.notReady}
              disabled={true}
            ></Button>
          )}
          {timers.length > 0 ? (
            <Button
              styleName="queueBtn"
              value={BTNTYPE.queue}
              onClick={handleQueueClick}
              inner={"Go to timers and queue "}
            ></Button>
          ) : null}
        </AddPanel>
      </Panel>
    </Container>
  );
};

export default Add;
