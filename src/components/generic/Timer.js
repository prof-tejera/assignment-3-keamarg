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
    color: ${COLORS.stop};
    animation: pulse 1.2s ease infinite, color 0.3s ease;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
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
    font-size: 1.5rem;
    position: absolute;
    bottom: 1rem;
    margin: 0 auto;
    background-color: transparent;
  }
`;
const Message = styled.p`
  color: ${COLORS.text};}
  line-height: 2rem;
  font-size:1.5rem;
`;

const Timer = (props) => {
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

  const { timerType } = props;

  // Click handler for all buttons
  const handleClick = (e) => {
    if (!docs) {
      const t = Number(time);

      // Start/stop button
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

      //Reset button
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

      //Forward button
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

      //Settings/ready button
      if (
        e.currentTarget.value === BTNTYPE.settings ||
        e.currentTarget.value === BTNTYPE.ready
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
          {/* {timerType !== TIMERS.stopwatch ? ( */}
          <Button
            styleName="settingsBtn"
            onClick={handleClick}
            value={BTNTYPE.settings}
          ></Button>
          {/* ) : null} */}
          <i className={`bi bi-stopwatch stopwatch ${!isRunning}`}></i>
        </UpperPanel>
        <Middlepanel>
          <div className="container">
            <div className="row col text-center">
              {showSettingsMessage ? (
                <>
                  <Button
                    styleName="ctaBtn"
                    onClick={handleClick}
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
              {/* {timerType === TIMERS.stopwatch ? (
                <Message>Target: {timerValue(savedTime)}</Message>
              ) : (
                <></>
              )} */}
              {showTimerRounds ? <DisplayTime value={currentRest} /> : <></>}
            </div>
            <div className="row justify-content-around">
              <Button
                styleName="col-3"
                value={btnState ? BTNTYPE.start : BTNTYPE.stop}
                onClick={handleClick}
              ></Button>
              <Button
                styleName="col-3"
                value={BTNTYPE.reset}
                onClick={handleClick}
              ></Button>
              {/* {timerType !== TIMERS.stopwatch ? ( */}
              <Button
                styleName="col-3"
                value={BTNTYPE.forward}
                onClick={handleClick}
              ></Button>
              {/* ) : ( */}
              <></>
              {/* )} */}
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
          styleName="settingsBtn"
          onClick={handleClick}
          value={BTNTYPE.settings}
        ></Button>
        <Settings styleName="p-2" timerType={timerType}></Settings>
        {time > 0 ? (
          <Button
            styleName="readyBtn"
            value={"ready"}
            onClick={handleClick}
          ></Button>
        ) : (
          <></>
        )}
      </SettingsPanel>
    </Panel>
  );
};
export default Timer;
