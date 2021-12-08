import React, { createContext, useState } from "react";
// import { TIMERS, STATUS } from "./utils/helpers";

export const TimerContext = createContext({
  setBtnState: () => {
    console.log("setBtnState: Im outside the Timerprovider");
  },
  setSettingsState: () => {
    console.log("setSettingsState: Im outside the Timerprovider");
  },
});

// I had different experiments going, but ended up wrapping one big provider around the whole app.

const TimerProvider = ({ children }) => {
  const [btnState, setBtnState] = useState(true);
  const [settingsState, setSettingsState] = useState(true);
  // const [stopwatchTimer, setStopwatchTimer] = useState(true);
  // const [stopwatchSettings, setStopwatchSettings] = useState(false);
  // const [countdownTimer, setCountdownTimer] = useState(true);
  // const [countdownSettings, setCountdownSettings] = useState(false);
  // const [xyTimer, setXyTimer] = useState(true);
  // const [xySettings, setXySettings] = useState(false);
  // const [tabataTimer, setTabataTimer] = useState(true);
  // const [tabataSettings, setTabataSettings] = useState(false);
  const [time, setTime] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [rest, setRest] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [docs, setDocs] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [currentRound, setCurrentRound] = useState(rounds);
  const [showSettingsMessage, setShowSettingsMessage] = useState(false);
  const [showTimerRounds, setShowTimerRounds] = useState(true);
  const [currentRest, setCurrentRest] = useState(false);
  const [timerType, setTimerType] = useState(
    localStorage.getItem("timerType")
      ? localStorage.getItem("timerType")
      : "Stopwatch"
  );
  // const [savedQueue, setSavedQueue] = useState(
  //   localStorage.getItem("timerQueue") ? localStorage.getItem("timerQueue") : ""
  // );
  const [intro, setIntro] = useState(true);
  const [outro, setOutro] = useState(false);
  // const [activeTimer, setActiveTimer] = useState(true);
  const [inQueue, setInQueue] = useState(false);

  //States for assignment 3 (would it be better to split into separate providers? And if so, why?)

  const [timers, setTimers] = useState([
    //seeds
    // {
    //   id: 0,
    //   timerType: TIMERS.stopwatch,
    //   time: 10,
    //   rounds: 1,
    //   rest: 0,
    //   status: STATUS.notRunning,
    // },
    // {
    //   id: 1,
    //   timerType: TIMERS.tabata,
    //   time: 10,
    //   rounds: 1,
    //   rest: 5,
    //   status: STATUS.notRunning,
    // },
  ]);
  const [timerRounds, setTimerRounds] = useState(0);

  return (
    <TimerContext.Provider
      value={{
        outro,
        setOutro,
        timerRounds,
        setTimerRounds,
        inQueue,
        setInQueue,
        // savedQueue,
        // setSavedQueue,
        // activeTimer,
        // setActiveTimer,
        timers,
        setTimers,
        intro,
        setIntro,
        timerType,
        setTimerType,
        currentRest,
        setCurrentRest,
        showTimerRounds,
        setShowTimerRounds,
        showSettingsMessage,
        setShowSettingsMessage,
        currentRound,
        setCurrentRound,
        message,
        setMessage,
        showMessage,
        setShowMessage,
        docs,
        setDocs,
        savedTime,
        setSavedTime,
        isRunning,
        setIsRunning,
        time,
        setTime,
        rounds,
        setRounds,
        rest,
        setRest,
        btnState,
        setBtnState,
        settingsState,
        setSettingsState,
        // stopwatchTimer,
        // setStopwatchTimer,
        // stopwatchSettings,
        // setStopwatchSettings,
        // countdownTimer,
        // setCountdownTimer,
        // countdownSettings,
        // setCountdownSettings,
        // xyTimer,
        // setXyTimer,
        // xySettings,
        // setXySettings,
        // tabataTimer,
        // setTabataTimer,
        // tabataSettings,
        // setTabataSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
