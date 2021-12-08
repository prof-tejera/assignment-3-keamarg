import { useContext, useRef, useEffect, useState } from "react";
import { TimerContext } from "../TimerProvider";
import { TIMERS, getMessage, MESSAGES, STATUS } from "./helpers";
import { useHistory } from "react-router";

export const useTimer = () => {
  const [delay] = useState(1000);
  const { isRunning, setIsRunning } = useContext(TimerContext);
  const { time, setTime } = useContext(TimerContext);
  const { setBtnState } = useContext(TimerContext);
  const { setShowMessage } = useContext(TimerContext);
  const { setMessage } = useContext(TimerContext);
  const { currentRound, setCurrentRound } = useContext(TimerContext);
  const { savedTime, setSavedTime } = useContext(TimerContext);
  const { currentRest, setCurrentRest } = useContext(TimerContext);
  const { rest } = useContext(TimerContext);
  const { timers, setTimers } = useContext(TimerContext);
  const { timerType, setTimerType } = useContext(TimerContext);
  const { timerRounds, setTimerRounds } = useContext(TimerContext);
  const { intro } = useContext(TimerContext);
  const { setOutro } = useContext(TimerContext);
  const history = useHistory();

  // Hook for controlling all timers
  useInterval(
    () => {
      if (timerType === TIMERS.stopwatch) {
        //stopwatch
        setTime(Number(time) + 1);
        if (Number(time) === Number(savedTime) - 1) {
          setIsRunning(false);
          setBtnState(true);
          setShowMessage(true);
          setMessage(MESSAGES.finished);

          // stopwatch queue
          if (timerRounds > 1) {
            setShowMessage(false);
            nextInQueueStop();
          } else if (timers[0] && !intro) {
            setTimers((prevTimers) => [
              ...prevTimers.slice(0, -1),
              {
                ...prevTimers[prevTimers.length - 1],
                status: STATUS.completed,
              },
            ]);
            setOutro(true);
            history.push(`/`);
            setTimers(JSON.parse(localStorage.getItem("timerQueue")));
          }
        }
      }
      //countdown
      if (timerType === TIMERS.countdown) {
        if (Number(time) > 1) {
          setTime(Number(time) - 1);
        } else {
          setIsRunning(false);
          setTime(0);
          setBtnState(true);
          setShowMessage(true);
          setMessage(MESSAGES.finished);

          // countdown queue
          if (timerRounds > 1) {
            setShowMessage(false);
            nextInQueueCount();
          } else if (timers[0] && !intro) {
            setTimers((prevTimers) => [
              ...prevTimers.slice(0, -1),
              {
                ...prevTimers[prevTimers.length - 1],
                status: STATUS.completed,
              },
            ]);
            setOutro(true);
            history.push(`/`);
            setTimers(JSON.parse(localStorage.getItem("timerQueue")));
          }
        }
      }
      //xy
      if (timerType === TIMERS.xy) {
        if (Number(time) > 1) {
          setTime(Number(time) - 1);
        } else if (currentRound > 1) {
          setCurrentRound((rounds) => rounds - 1);
          setTime(savedTime);
          setShowMessage(true);
          setMessage(getMessage(currentRound));
        } else if (Number(time) === 1 && currentRound === 1) {
          setCurrentRound(0);
          setTime(0);
          setBtnState(true);
          setIsRunning(false);
          setShowMessage(true);
          setMessage(MESSAGES.finished);
        }
      }

      //tabata
      if (timerType === TIMERS.tabata) {
        if (!currentRest) {
          if (Number(time) > 1) {
            setTime(Number(time) - 1);
            setShowMessage(true);
            setMessage(MESSAGES.work);
          } else if (currentRound > 0) {
            setTime(rest);
            setCurrentRest(true);
            setShowMessage(true);
            setMessage(MESSAGES.rest);
          }
        }
        if (currentRest) {
          if (Number(time) > 1) {
            setTime(Number(time) - 1);
          } else if (currentRound > 1) {
            setCurrentRound((rounds) => rounds - 1);
            setTime(savedTime);
            setCurrentRest(false);
            setShowMessage(true);
            setMessage(MESSAGES.work2);
          } else if (Number(time) === 1 && currentRound === 1) {
            setCurrentRound(0);
            setTime(0);
            setBtnState(true);
            setIsRunning(false);
            setShowMessage(true);
            setMessage(MESSAGES.finished);
          }
        }
      }
    },
    isRunning ? delay : null
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  //working countdown queue
  const nextInQueueCount = () => {
    setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
    let currentIndex = timers.length - timerRounds;

    setTimers((prevTimers) =>
      prevTimers.map((item, index) => {
        let obj = Object.assign({}, item);
        if (index === currentIndex) {
          obj.status = STATUS.completed;
        }
        if (index === currentIndex + 1) {
          obj.status = STATUS.running;
        }
        return obj;
      })
    );
    setTimerType(timers[currentIndex + 1].timerType);
    setSavedTime(timers[currentIndex + 1].time);
    setIsRunning(true);
    setBtnState(false);
    if (timers[currentIndex + 1].timerType === TIMERS.stopwatch) {
      setTime(0);
    } else {
      setTime(timers[currentIndex + 1].time);
    }
  };
  //working stopwatch queue
  const nextInQueueStop = () => {
    setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
    let currentIndex = timers.length - timerRounds;

    setTimers((prevTimers) =>
      prevTimers.map((item, index) => {
        let obj = Object.assign({}, item);
        if (index === currentIndex) {
          obj.status = STATUS.completed;
        }
        if (index === currentIndex + 1) {
          obj.status = STATUS.running;
        }
        return obj;
      })
    );
    setTimerType(timers[currentIndex + 1].timerType);
    setSavedTime(timers[currentIndex + 1].time);
    setIsRunning(true);
    setBtnState(false);
    if (timers[currentIndex + 1].timerType === TIMERS.stopwatch) {
      setTime(0);
    } else {
      setTime(timers[currentIndex + 1].time);
    }
  };
};

//working stopwatch queue
//   const nextInQueue = () => {
//     setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
//     let currentIndex = timers.length - timerRounds;

//     setTimers((prevTimers) =>
//       prevTimers.map((item, index) => {
//         let obj = Object.assign({}, item);
//         if (index === currentIndex) {
//           obj.status = STATUS.completed;
//         }
//         if (index === currentIndex + 1) {
//           obj.status = STATUS.running;
//         }
//         return obj;
//       })
//     );
//     setTimerType(timers[currentIndex].timerType);
//     setSavedTime(timers[currentIndex + 1].time);
//     setTime(0);
//     setIsRunning(true);
//     setBtnState(false);
//   };
// };

//working countdown queue
//   const nextInQueue = () => {
//     setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
//     let currentIndex = timers.length - timerRounds;

//     setTimers((prevTimers) =>
//       prevTimers.map((item, index) => {
//         let obj = Object.assign({}, item);
//         if (index === currentIndex) {
//           obj.status = STATUS.completed;
//         }
//         if (index === currentIndex + 1) {
//           obj.status = STATUS.running;
//         }
//         return obj;
//       })
//     );
//     // setTimerType(timers[currentIndex].timerType);
//     // setTime(0);
//     setSavedTime(timers[currentIndex + 1].time);
//     setTime(timers[currentIndex + 1].time);
//     setIsRunning(true);
//     setBtnState(false);
//   };
// };

//working stopwatch queue
//   const nextInQueue = () => {
//     setTimerRounds((prevTimerRounds) => prevTimerRounds - 1);
//     let currentIndex = timers.length - timerRounds;

//     setTimers((prevTimers) =>
//       prevTimers.map((item, index) => {
//         let obj = Object.assign({}, item);
//         if (index === currentIndex) {
//           obj.status = STATUS.completed;
//         }
//         if (index === currentIndex + 1) {
//           obj.status = STATUS.running;
//         }
//         return obj;
//       })
//     );
//     setTimerType(timers[currentIndex].timerType);
//     setSavedTime(timers[currentIndex + 1].time);
//     setTime(0);
//     setIsRunning(true);
//     setBtnState(false);
//   };
// };
