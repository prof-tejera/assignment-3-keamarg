import { useContext, useRef, useEffect, useState } from "react";
import { TimerContext } from "../TimerProvider";
import { TIMERS, getMessage, MESSAGES } from "./helpers";

export const useTimer = (timerType) => {
  const [delay] = useState(1000);
  const { isRunning, setIsRunning } = useContext(TimerContext);
  const { time, setTime } = useContext(TimerContext);
  const { setBtnState } = useContext(TimerContext);
  const { setShowMessage } = useContext(TimerContext);
  const { setMessage } = useContext(TimerContext);
  const { currentRound, setCurrentRound } = useContext(TimerContext);
  const { savedTime } = useContext(TimerContext);
  const { currentRest, setCurrentRest } = useContext(TimerContext);
  const { rest } = useContext(TimerContext);

  // Code inspired by the article Nico shared (reference in readme)
  useInterval(
    () => {
      if (timerType === TIMERS.stopwatch) {
        setTime(Number(time) + 1);
      } else {
        if (Number(time) > 0) {
          setTime(Number(time) - 1);
        } else {
          setIsRunning(false);
          setBtnState(true);

          setShowMessage(true);
          if (timerType === TIMERS.countdown) {
            setMessage(MESSAGES.finished);
          } else {
            setMessage(getMessage(currentRound));
          }
        }
        if (timerType === TIMERS.xy) {
          if (Number(time) === 0 && currentRound > 1) {
            setCurrentRound((rounds) => rounds - 1);
            setTime(savedTime);
            setIsRunning(true);
            setBtnState(false);
          }
        }
        if (timerType === TIMERS.tabata && currentRound > 1) {
          if (!currentRest) {
            setShowMessage(true);
            setMessage(MESSAGES.work);
          }
          if (Number(time) === 0 && currentRound > 1) {
            setCurrentRest(!currentRest);
            setMessage(MESSAGES.rest);
            setTime(rest);
            setIsRunning(true);
            setBtnState(false);
            if (currentRest) {
              setMessage(MESSAGES.work2);
              setCurrentRound((rounds) => rounds - 1);
              setTime(savedTime);
            }
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
};
