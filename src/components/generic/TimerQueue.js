import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { COLORS, timerValue, BTNTYPE } from "../../utils/helpers";
import Button from "../generic/Button";
import { useHistory } from "react-router";

const Title = styled.h1`
  color: ${COLORS.text};
  font-size: 1.8rem;
`;

const Queue = styled.div`
  width: 19rem;
  // visibility: hidden;
`;
const Item = styled.div`
  color: ${COLORS.text};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.45rem;
  border-radius: 5px;
  margin-top: 0.15rem;
  font-size: 0.9rem;
`;

const TimerQueue = () => {
  const { timers, setTimers } = useContext(TimerContext);
  const { setOutro } = useContext(TimerContext);
  const { isRunning } = useContext(TimerContext);

  const [totalTime, setTotalTime] = useState(0);
  const history = useHistory();

  const removeItem = (id) => {
    console.log(timers);
    const newList = timers.filter((item) => item.id !== id);
    // let newId = 0;
    // newList.map((item) => {
    //   var temp = Object.assign({}, item);
    //   temp.id = newId;
    //   return temp;
    // });
    setTimers(newList);
    // console.log(newList);
  };

  //set the total time in que
  useEffect(() => {
    if (timers.length > 0) {
      const time = timers.reduce((prevVal, currVal) => ({
        totalTime: prevVal.totalTime + currVal.totalTime,
      }));
      const rest = timers.reduce((prevVal, currVal) => ({
        totalRest: prevVal.totalRest + currVal.totalRest,
      }));
      setTotalTime(time.totalTime + rest.totalRest);
    } else {
      setTotalTime(0);
    }
    // if (timers[0] !== undefined && STATUS.running) {
    //   console.log("Timers from TimerQueue: " + timers[0].time);
    // }
  }, [timers]);

  // useEffect(() => {}, [timers]);

  const clickHandler = () => {
    setTimers(JSON.parse(localStorage.getItem("timerQueue")));
    setOutro(true);
    history.push(`/`);
  };

  return (
    // <Queue style={!timers[0] ? { visibility: "hidden" } : null}>
    <Queue>
      <Title>Queue ({timerValue(totalTime)})</Title>
      {timers.length > 0 ? (
        timers.map((item, key) => (
          <Item
            id={key + 1}
            key={key}
            onClick={isRunning ? null : () => removeItem(item.id)}
            className={`${item.timerType} ${item.status}`}
          >
            {key + 1} {item.timerType} ({timerValue(item.totalTime)}){" "}
            {item.status}
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
