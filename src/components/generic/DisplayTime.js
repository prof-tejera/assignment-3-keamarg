import React, { useContext } from "react";
import { TimerContext } from "../../TimerProvider";
import styled from "styled-components";
import { timerValue, COLORS } from "../../utils/helpers.js";

const Display = styled.label`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 300;
  // font-family: "Orbitron", sans-serif;
`;

const DisplayTime = () => {
  const { time } = useContext(TimerContext);
  const { currentRest } = useContext(TimerContext);

  return (
    <Display style={{ color: `${currentRest ? COLORS.stop : COLORS.text}` }}>
      {timerValue(time)}
    </Display>
  );
};

export default DisplayTime;

// import React, { useContext } from "react";
// import { TimerContext } from "../../TimerProvider";
// import styled from "styled-components";
// import { timerValue, COLORS } from "../../utils/helpers.js";

// const Display = styled.label`
//   margin-bottom: 2rem;
//   font-size: 3rem;
//   font-weight: 300;
//   // font-family: "Orbitron", sans-serif;
//   color: white;
//   color: ${(props) => (props.value ? COLORS.stop : COLORS.text)};
// `;

// const DisplayTime = (props) => {
//   DisplayTime.defaultProps = {
//     value: "none",
//   };
//   const { value } = props;
//   const { time } = useContext(TimerContext);

//   return <Display value={value}>{timerValue(time)}</Display>;
// };

// export default DisplayTime;
