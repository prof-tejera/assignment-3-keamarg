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
      //stopwatch
      if (timerType === TIMERS.stopwatch) {
        setTime(Number(time) + 1);
        if (Number(time) === Number(savedTime) - 1) {
          setIsRunning(false);
          setBtnState(true);
          setShowMessage(true);
          setMessage(MESSAGES.finished);
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
};
