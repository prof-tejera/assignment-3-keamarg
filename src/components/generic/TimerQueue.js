import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { COLORS, timerValue, BTNTYPE, STATUS } from "../../utils/helpers";
import Button from "../generic/Button";

const Title = styled.h1`
  color: ${COLORS.text};
  font-size: 1.8rem;
`;

const Queue = styled.div`
  width: 19rem;
  .running {
    background-color: green;
  }
  .notRunning {
    background-color: red;
  }
  .completed {
    background-color: gold;
  }
`;
const Item = styled.div`
  color: ${COLORS.text};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.15rem;
`;

const TimerQueue = () => {
  const { timers, setTimers } = useContext(TimerContext);
  const { setIntro } = useContext(TimerContext);
  const [totalTime, setTotalTime] = useState(0);

  const removeItem = (id) => {
    const newList = timers.filter((item) => item.id !== id);
    setTimers(newList);
  };

  useEffect(() => {
    if (timers.length > 0) {
      const time = timers.reduce((prevVal, currVal) => ({
        time: prevVal.time + currVal.time,
      }));
      const rest = timers.reduce((prevVal, currVal) => ({
        rest: prevVal.rest + currVal.rest,
      }));
      setTotalTime(time.time + rest.rest);
    } else {
      setTotalTime(0);
    }
    // if (timers[0] !== undefined && STATUS.running) {
    //   console.log("Timers from TimerQueue: " + timers[0].time);
    // }
  }, [timers]);

  const clickHandler = () => {
    setTimers(JSON.parse(localStorage.getItem("timerQueue")));
    setIntro(true);
  };

  return (
    <Queue>
      <Title>Queue ({timerValue(totalTime)})</Title>
      {timers.length > 0 ? (
        timers.map((item, key) => (
          <Item
            id={item.id}
            key={key}
            onClick={() => removeItem(item.id)}
            className={`${item.timerType} ${item.status}`}
          >
            {key + 1} {item.timerType}, Status: {item.status}, id: {item.id}
          </Item>
        ))
      ) : (
        <Item className="empty">
          <span>Queue empty...</span>
          {localStorage.getItem("timerQueue") !== "[]" ? (
            <Button
              onClick={clickHandler}
              inner="Load last? "
              value={BTNTYPE.queue}
              styleName="loadBtn"
            ></Button>
          ) : null}
        </Item>
      )}
    </Queue>
  );
};

export default TimerQueue;
