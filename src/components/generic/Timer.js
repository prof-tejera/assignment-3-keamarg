import React, { useContext, useEffect } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import {
  PulseAnim,
  PulseAnim2,
  ColorAnim,
  SettingsBtn,
  NotReadyBtn,
  BackBtn,
  ReadyBtn,
} from "../../utils/css";
import Panel from "../generic/Panel";
import Settings from "../generic/Settings";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import IntroOutro from "./IntroOutro";
import {
  BTNTYPE,
  COLORS,
  TIMERS,
  MESSAGES,
  timerValue,
  STATUS,
} from "../../utils/helpers";
import { useTimer } from "../../utils/hooks";
import { useHistory } from "react-router";

const Title = styled.h1`
  color: ${COLORS.text};
  }
`;
const UpperPanel = styled.div`
  position: relative;
  height: 15rem;
  .false {
    animation: PulseAnim 1s ease 1s infinite, ColorAnim 0.5s ease forwards;
  }
  ${PulseAnim};
  ${ColorAnim};

  i.stopwatch {
    font-size: 10rem;
    opacity: 40%;
    display: block;
  }
  .settingsBtn {
    ${SettingsBtn}
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
    ${SettingsBtn}
  }
  .readyBtn {
    position: absolute;
    ${ReadyBtn}
  }

  ${PulseAnim2}

  .notReadyBtn {
    position: absolute;
    ${NotReadyBtn}
  }

  .backBtn {
    ${BackBtn}
  }

  .settingsTitle {
    position: absolute;
    top: 1rem;
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
  const { rounds, setRounds } = useContext(TimerContext);
  const { currentRound, setCurrentRound } = useContext(TimerContext);
  const { message, setMessage } = useContext(TimerContext);
  const { showMessage, setShowMessage } = useContext(TimerContext);
  const { showSettingsMessage, setShowSettingsMessage } =
    useContext(TimerContext);
  const { showTimerRounds, setShowTimerRounds } = useContext(TimerContext);
  const { currentRest, setCurrentRest } = useContext(TimerContext);
  const { timerType, setTimerType } = useContext(TimerContext);
  const { rest, setRest } = useContext(TimerContext);
  const { intro, setIntro } = useContext(TimerContext);
  const { inQueue } = useContext(TimerContext);
  const { setTimers } = useContext(TimerContext);
  const { timerRounds, setTimerRounds } = useContext(TimerContext);
  const { timers } = useContext(TimerContext);
  const { outro, setOutro } = useContext(TimerContext);

  const history = useHistory();

  //make sure the timer is set correctly when entering direct URL
  useEffect(() => {
    if (props.match.path.slice(1)) {
      setTimerType(props.match.path.slice(1));
    }
  }, [setTimerType, props.match.path]);

  const refreshTimers = () => {
    setTimers((prevTimers) =>
      prevTimers.map((item) => {
        let obj = Object.assign({}, item);
        obj.status = STATUS.notRunning;
        return obj;
      })
    );
  };

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
          setIsRunning(true);
          setBtnState(false);
        }
        if (timerType !== TIMERS.stopwatch && t) {
          setIsRunning(true);
          setBtnState(false);
        }
        if (inQueue) {
          if (isRunning) {
            setIsRunning(false);
            setBtnState(true);
          } else {
            setIsRunning(true);
            setBtnState(false);
          }
        }
      }
    }
  };

  //Reset button
  const handleClickReset = () => {
    if (!docs) {
      if (inQueue) {
        refreshTimers();
        localStorage.setItem("timerQueue", JSON.stringify(timers));
        setIntro(true);
        history.push(`/`);
      }
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
  };

  //Forward button
  const handleClickForward = () => {
    if (!docs) {
      const t = Number(time);

      //for "queue timer"
      if (inQueue && timerRounds > 0) {
        setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
        let currentIndex = timers.length - timerRounds;
        setTimers((prevTimers) =>
          prevTimers.map((item, index) => {
            var temp = Object.assign({}, item);
            if (index === currentIndex) {
              temp.status = STATUS.completed;
            }
            if (index === currentIndex + 1) {
              temp.status = STATUS.running;
            }
            return temp;
          })
        );
        if (timers[currentIndex + 1]) {
          setTimerType(timers[currentIndex + 1].timerType);
          setSavedTime(timers[currentIndex + 1].time);
          if (timers[currentIndex + 1].timerType === TIMERS.stopwatch) {
            setTime(0);
          } else {
            setTime(timers[currentIndex + 1].time);
            setRounds(timers[currentIndex + 1].rounds);
            setCurrentRound(timers[currentIndex + 1].rounds);
            setRest(timers[currentIndex + 1].rest);
          }
        }
        if (timerRounds === 1) {
          setTimers((prevTimers) => [
            ...prevTimers.slice(0, -1),
            {
              ...prevTimers[prevTimers.length - 1],
              status: STATUS.completed,
            },
          ]);
          setOutro(true);
          history.push(`/`);
        }
        setCurrentRest(false);
        setIsRunning(true);
        setBtnState(false);
      }

      //for "single timer"
      else {
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
        setIsRunning(false);
        setBtnState(true);
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
  if (intro || outro) {
    return <IntroOutro></IntroOutro>;
  } else if (!settingsState) {
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
    //settings
    <Panel timerType={timerType}>
      <SettingsPanel className="settingspanel text-center d-flex align-items-center justify-content-center">
        <Title className="settingsTitle">Settings</Title>
        <Button
          styleName="backBtn"
          onClick={handleClickSettingsReady}
          value={BTNTYPE.back}
        ></Button>
        <Settings styleName="p-2" timerType={timerType}></Settings>
        {time > 0 && timerType !== TIMERS.tabata ? (
          <Button
            styleName="readyBtn"
            value={BTNTYPE.ready}
            onClick={handleClickSettingsReady}
          ></Button>
        ) : time > 0 && rest > 0 ? (
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
