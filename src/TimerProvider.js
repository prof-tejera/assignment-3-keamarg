import React, { createContext, useState } from "react";

export const TimerContext = createContext({
  setBtnState: () => {
    console.log("setBtnState: Im outside the Timerprovider");
  },
  setSettingsState: () => {
    console.log("setSettingsState: Im outside the Timerprovider");
  },
});

const TimerProvider = ({ children }) => {
  const [btnState, setBtnState] = useState(true);
  const [settingsState, setSettingsState] = useState(true);
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
  const [intro, setIntro] = useState(true);
  const [outro, setOutro] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [timers, setTimers] = useState([]);
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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
