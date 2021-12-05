import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { COLORS, timerValue } from "../../utils/helpers";

const Item = styled.div`
  color: ${COLORS.text};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.15rem;
`;

const TimerQueue = () => {
  const { timers, setTimers } = useContext(TimerContext);
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
  }, [timers]);

  return (
    <div>
      <h2>Queue ({timerValue(totalTime)})</h2>
      {timers.length > 0 ? (
        timers.map((item, key) => (
          <Item
            id={item.id}
            key={key}
            onClick={() => removeItem(item.id)}
            className={item.timerType}
          >
            {key + 1} Timer: {item.timerType}, Status: {item.status}
          </Item>
        ))
      ) : (
        <Item className="empty">Nothing in queue...</Item>
      )}
    </div>
  );
};

export default TimerQueue;
