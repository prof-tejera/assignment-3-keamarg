import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import Panel from "../generic/Panel";
import Button from "../generic/Button";
import styled from "styled-components";
import { FadeIn, Bounce, ReadyBtn, PulseAnim2 } from "../../utils/css";
import { BUTTONS, BTNTYPE, COLORS, TIMERS } from "../../utils/helpers";
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
  height: 22.5rem;
  text-align: center;
  ${FadeIn};
  ${Bounce};
  ${PulseAnim2}
`;

const Arrow = styled.i`
  color: ${COLORS.text};
  animation: FadeIn 2s ease, Bounce 2s;
  position: relative;
`;

const Intro = () => {
  const { timerType, setTimerType } = useContext(TimerContext);
  const { setIntro } = useContext(TimerContext);
  const { timers } = useContext(TimerContext);
  const { setTime } = useContext(TimerContext);
  const { setSavedTime } = useContext(TimerContext);
  const { setSettingsState } = useContext(TimerContext);
  const { btnState, setBtnState } = useContext(TimerContext);
  const { setIsRunning } = useContext(TimerContext);
  const { setRounds } = useContext(TimerContext);
  const { setRest } = useContext(TimerContext);
  const { setCurrentRound } = useContext(TimerContext);

  const history = useHistory();

  const handleNavClick = () => {
    //I think this should be put in helpers and used in the useInterval hook as well
    if (timers.length > 0) {
      setTime(timers[0].time);
      setSavedTime(timers[0].time);
      setIntro(false);
      setSettingsState(false);
      setBtnState(!btnState);
      setIsRunning(true);
      switch (timers[0].timerType) {
        case TIMERS.stopwatch:
          setTime(0);
          history.push(`/stopwatch`);
          setTimerType(TIMERS.countdown);
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
                onClick={handleNavClick}
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
      </UpperPanel>
    </Panel>
  );
};
export default Intro;
