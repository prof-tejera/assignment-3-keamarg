import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import Panel from "../generic/Panel";
import Settings from "../generic/Settings";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import {
  BTNTYPE,
  COLORS,
  TIMERS,
  MESSAGES,
  timerValue,
} from "../../utils/helpers";
import { useTimer } from "../../utils/hooks";

const Title = styled.h1`
  color: ${COLORS.text};
`;
const UpperPanel = styled.div`
  position: relative;
  height: 15rem;
  .false {
    animation: pulse 1s ease infinite, color 1s ease;
    animation-delay: 1s;
  }

  @keyframes pulse {
    0% {
      color: ${COLORS.stop};
      transform: scale(1);
    }
    10% {
      color: ${COLORS.stop};
      transform: scale(1.1);
    }

    100% {
      color: ${COLORS.stop};
      transform: scale(1);
    }
  }

  @keyframes color {
    0% {
      color: black;
    }
    100% {
      color: ${COLORS.stop};
    }
  }

  i.stopwatch {
    font-size: 10rem;
    opacity: 40%;
    display: block;
  }
  .settingsBtn {
    z-index: 1;
    font-size: 1.5rem;
    // display: block;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
  }
`;
const LowerPanel = styled.div`
  height: 15rem;
  .ctaBtn {
    z-index: 1;
    font-size: 1.5rem;
    background-color: transparent;
  }
`;
const Middlepanel = styled.div`
  height: 5rem;
  padding-top: 4rem;
  .ctaBtn {
    z-index: 1;
    font-size: 1.5rem;
    background-color: transparent;
    line-height: 1rem;
  }
`;

const SettingsPanel = styled.div`
  position: relative;
  height: 25rem;
  .settingsBtn {
    z-index: 1;
    font-size: 1.5rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
  }
  .readyBtn {
    z-index: 1;
    font-size: 3rem;
    position: absolute;
    bottom: 1rem;
    margin: 0 auto;
    background-color: transparent;
    animation: pulse2 1s ease 2 forwards;
  }

  @keyframes pulse2 {
    0% {
      color: ${COLORS.start};
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      color: ${COLORS.start};
    }
  }

  .notReadyBtn {
    z-index: 1;
    font-size: 3rem;
    position: absolute;
    bottom: 1rem;
    margin: 0 auto;
    background-color: transparent;
    opacity: 0.2;
    :hover {
      opacity: 0.3;
    }
  }

  .backBtn {
    z-index: 1;
    font-size: 1.5rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
  }
`;
const Message = styled.p`
  color: ${COLORS.text};}
  line-height: 2rem;
  font-size:1.5rem;
`;

const Timer = () => {
  const { time, setTime } = useContext(TimerContext);
  const { isRunning, setIsRunning } = useContext(TimerContext);
  const { btnState, setBtnState } = useContext(TimerContext);
  const { settingsState, setSettingsState } = useContext(TimerContext);
  const { savedTime, setSavedTime } = useContext(TimerContext);
  const { docs } = useContext(TimerContext);
  const { rounds } = useContext(TimerContext);
  const { currentRound, setCurrentRound } = useContext(TimerContext);
  const { message, setMessage } = useContext(TimerContext);
  const { showMessage, setShowMessage } = useContext(TimerContext);
  const { showSettingsMessage, setShowSettingsMessage } =
    useContext(TimerContext);
  const { showTimerRounds, setShowTimerRounds } = useContext(TimerContext);
  const { currentRest, setCurrentRest } = useContext(TimerContext);
  const { timerType } = useContext(TimerContext);

  // Click handler for all buttons (refactored to seperate handlers)

  // Start/stop button
  const handleClickStartStop = (e) => {
    if (!docs) {
      const t = Number(time);
      if (
        e.currentTarget.value === BTNTYPE.start ||
        e.currentTarget.value === BTNTYPE.stop
      ) {
        if (
          timerType === TIMERS.stopwatch &&
          Number(time) !== Number(savedTime)
        ) {
          setIsRunning(!isRunning);
          setBtnState(!btnState);
        }
        if (timerType !== TIMERS.stopwatch && t) {
          setIsRunning(!isRunning);
          setBtnState(!btnState);
        }
      }
    }
  };

  //Reset button
  const handleClickReset = (e) => {
    if (!docs) {
      if (e.currentTarget.value === BTNTYPE.reset) {
        if (timerType === TIMERS.stopwatch) {
          setTime(0);
        } else {
          setTime(savedTime);
        }
        setBtnState(true);
        setIsRunning(false);
        setShowMessage(false);
        setCurrentRound(rounds);
        setCurrentRest(false);
      }
    }
  };

  //Forward button
  const handleClickForward = (e) => {
    if (!docs) {
      const t = Number(time);
      if (e.currentTarget.value === BTNTYPE.forward) {
        if (timerType === TIMERS.stopwatch) {
          setTime(savedTime);
          setMessage(MESSAGES.finished);
          setShowMessage(true);
        }
        if (t && timerType !== TIMERS.stopwatch) {
          setTime(0);
          setMessage(MESSAGES.finished);
          setShowMessage(true);
          setCurrentRest(false);
        }
        setCurrentRound(0);
      }
    }
  };

  //Settings/ready button
  const handleClickSettingsReady = (e) => {
    if (!docs) {
      const t = Number(time);
      if (
        e.currentTarget.value === BTNTYPE.settings ||
        e.currentTarget.value === BTNTYPE.ready ||
        e.currentTarget.value === BTNTYPE.back
      ) {
        setSettingsState(!settingsState);
        setBtnState(true);
        setSavedTime(time);
        setIsRunning(false);
        setShowTimerRounds(false);
        setShowMessage(false);
        setCurrentRound(rounds);
        setCurrentRest(false);

        if (timerType === TIMERS.countdown || timerType === TIMERS.stopwatch) {
          if (timerType === TIMERS.stopwatch) {
            setSavedTime(time);
            setTime(0);
          }
          if (!t) {
            setMessage(MESSAGES.settimer);
            setShowSettingsMessage(true);
          } else {
            setShowSettingsMessage(false);
            setShowTimerRounds(true);
          }
        }
        if (timerType === TIMERS.xy || timerType === TIMERS.tabata) {
          if (!t || rounds < 1) {
            setMessage(MESSAGES.settimer);
            setShowSettingsMessage(true);
          } else {
            setShowSettingsMessage(false);
            setShowTimerRounds(true);
          }
        }
      }
    }
  };

  //start the timer hook
  useTimer(timerType);

  // Base strucure for all timers
  if (!settingsState) {
    return (
      <Panel timerType={timerType}>
        <UpperPanel className="text-center">
          <Title>{timerType}</Title>
          <Button
            styleName="settingsBtn"
            onClick={handleClickSettingsReady}
            value={BTNTYPE.settings}
          ></Button>
          <i className={`bi bi-stopwatch stopwatch ${!isRunning}`}></i>
        </UpperPanel>
        <Middlepanel>
          <div className="container">
            <div className="row col text-center">
              {showSettingsMessage ? (
                <>
                  <Button
                    styleName="ctaBtn"
                    onClick={handleClickSettingsReady}
                    value={BTNTYPE.settings}
                    inner={message + " "}
                  ></Button>
                </>
              ) : showMessage ? (
                <Message> {message}</Message>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Middlepanel>
        <LowerPanel className="d-flex align-items-center">
          <div className="container">
            <div className="row col text-center">
              {showTimerRounds &&
              // currentRound > 1 &&
              (timerType === TIMERS.xy || timerType === TIMERS.tabata) ? (
                <Message>
                  {" "}
                  {currentRound}/{rounds} rounds left
                </Message>
              ) : (
                <Message>
                  {timerType === TIMERS.stopwatch
                    ? `Target: ${timerValue(savedTime)}`
                    : timerType === TIMERS.countdown
                    ? `Start time: ${timerValue(savedTime)}`
                    : " "}
                </Message>
              )}
              {showTimerRounds ? <DisplayTime value={currentRest} /> : <></>}
            </div>
            <div className="row justify-content-around">
              <Button
                styleName="col-3"
                value={btnState ? BTNTYPE.start : BTNTYPE.stop}
                onClick={handleClickStartStop}
              ></Button>
              <Button
                styleName="col-3"
                value={BTNTYPE.reset}
                onClick={handleClickReset}
              ></Button>
              <Button
                styleName="col-3"
                value={BTNTYPE.forward}
                onClick={handleClickForward}
              ></Button>
              <></>
            </div>
          </div>
        </LowerPanel>
      </Panel>
    );
  }
  return (
    <Panel timerType={timerType}>
      <SettingsPanel className="settingspanel text-center d-flex align-items-center justify-content-center">
        <Button
          styleName="backBtn"
          onClick={handleClickSettingsReady}
          value={BTNTYPE.back}
        ></Button>
        <Settings styleName="p-2" timerType={timerType}></Settings>
        {time > 0 ? (
          <Button
            styleName="readyBtn"
            value={BTNTYPE.ready}
            onClick={handleClickSettingsReady}
          ></Button>
        ) : (
          <Button
            styleName="notReadyBtn"
            value={BTNTYPE.notReady}
            disabled={true}
            onClick={handleClickSettingsReady}
          ></Button>
        )}
      </SettingsPanel>
    </Panel>
  );
};
export default Timer;
