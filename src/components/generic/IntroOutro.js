import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import Panel from "./Panel";
import Button from "./Button";
import styled from "styled-components";
import { FadeIn, Bounce, ReadyBtn, PulseAnim2 } from "../../utils/css";
import {
  BUTTONS,
  BTNTYPE,
  COLORS,
  TIMERS,
  STATUS,
  MESSAGES,
} from "../../utils/helpers";
import { useHistory } from "react-router-dom";

const Text = styled.h1`
  color: ${COLORS.text};
  font-size: 2rem;
  padding: 0 1rem 0 1rem;
`;

const Choice1 = styled.div`
  animation: FadeIn 2s ease;
`;

const Choice2 = styled.div`
  opacity: 0;
  animation: FadeIn 2s ease 1s forwards;
  .readyBtn {
    color: ${COLORS.text};
    ${ReadyBtn}
  }
`;
const UpperPanel = styled.div`
  padding-top: 1rem;
  height: 25rem;
  text-align: center;
  ${FadeIn};
  ${Bounce};
  ${PulseAnim2}
  .readyBtn {
    color: ${COLORS.text};
    ${ReadyBtn}
  }
`;

const Arrow = styled.i`
  color: ${COLORS.text};
  animation: FadeIn 2s ease, Bounce 2s;
  position: relative;
`;

const IntroOutro = () => {
  const { timerType, setTimerType } = useContext(TimerContext);
  const { setIntro } = useContext(TimerContext);
  const { timers, setTimers } = useContext(TimerContext);
  const { setTime } = useContext(TimerContext);
  const { setSavedTime } = useContext(TimerContext);
  const { setSettingsState } = useContext(TimerContext);
  const { btnState, setBtnState } = useContext(TimerContext);
  const { setIsRunning } = useContext(TimerContext);
  const { setRounds } = useContext(TimerContext);
  const { setRest } = useContext(TimerContext);
  const { setCurrentRound } = useContext(TimerContext);
  const { setInQueue } = useContext(TimerContext);
  const { setTimerRounds } = useContext(TimerContext);
  const { outro, setOutro } = useContext(TimerContext);

  const history = useHistory();

  // const setFirstQueue = () => {
  //   setTimers((prevTimers) => [
  //     (prevTimers[0] = {
  //       id: 0,
  //       timerType: timers[0].timerType,
  //       time: timers[0].time,
  //       rounds: timers[0].rounds,
  //       rest: timers[0].rest,
  //       status: STATUS.running,
  //     }),
  //     ...prevTimers.slice(1),
  //   ]);
  // };

  const setFirstQueue = () => {
    setTimers((prevTimers) => [
      { ...prevTimers[0], status: STATUS.running },
      ...prevTimers.slice(1),
    ]);
  };

  const refreshTimers = () => {
    setTimers((prevTimers) =>
      prevTimers.map((item) => {
        let obj = Object.assign({}, item);
        obj.status = STATUS.notRunning;
        return obj;
      })
    );
  };

  const handleStartClick = () => {
    //I think this should be put in helpers and used in the useInterval hook as well
    refreshTimers();
    localStorage.setItem("timerQueue", JSON.stringify(timers));
    if (timers.length > 0) {
      setTimerRounds(timers.length);
      setInQueue(true);
      setTime(timers[0].time);
      setFirstQueue();
      setSavedTime(timers[0].time);
      setIntro(false);
      setOutro(false);
      setSettingsState(false);
      setBtnState(!btnState);
      setIsRunning(true);
      switch (timers[0].timerType) {
        case TIMERS.stopwatch:
          setTime(0);
          history.push(`/stopwatch`);
          setTimerType(TIMERS.stopwatch);
          break;

        case TIMERS.countdown:
          history.push(`/countdown`);
          setTimerType(TIMERS.countdown);
          break;

        case TIMERS.xy:
          history.push(`/xy`);
          setTimerType(TIMERS.xy);
          setCurrentRound(timers[0].rounds);
          setRounds(timers[0].rounds);
          break;

        case TIMERS.tabata:
          history.push(`/tabata`);
          setTimerType(TIMERS.tabata);
          setCurrentRound(timers[0].rounds);
          setRounds(timers[0].rounds);
          setRest(timers[0].rest);
          break;

        default:
          break;
      }
    }
  };

  const handleAddClick = () => {
    history.push(`/add`);
  };
  return (
    <Panel timerType={timerType}>
      <UpperPanel>
        {outro ? (
          <span>
            <Text>{MESSAGES.finished}</Text>
            <Text>Another round?</Text>
            <Button
              styleName="readyBtn"
              value={BTNTYPE.start}
              onClick={handleStartClick}
            ></Button>
          </span>
        ) : (
          <div>
            <Choice1>
              <Arrow className={BUTTONS.arrowUp}></Arrow>
              <Text>Choose a timer</Text>
            </Choice1>
            <Choice2>
              {timers.length > 0 ? (
                <span>
                  <Text>... or start the queue</Text>
                  <Button
                    styleName="readyBtn"
                    value={BTNTYPE.start}
                    onClick={handleStartClick}
                  ></Button>
                </span>
              ) : (
                <span>
                  <Text>... or add to queue</Text>
                  <Button
                    styleName="readyBtn"
                    value={BTNTYPE.add}
                    onClick={handleAddClick}
                  ></Button>
                </span>
              )}
            </Choice2>
          </div>
        )}
      </UpperPanel>
    </Panel>
  );
};
export default IntroOutro;
