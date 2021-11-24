import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS, TIMERS } from "../../utils/helpers.js";

const Container = styled.div`
  // border: 1px solid black;
  width: 20rem;
  background-color: ${(props) =>
    props.type === TIMERS.stopwatch
      ? COLORS.stopwatch
      : props.type === TIMERS.countdown
      ? COLORS.countdown
      : props.type === TIMERS.xy
      ? COLORS.xy
      : COLORS.tabata};
  font-size: 2rem;
  border-radius: 0rem 0rem 0.3rem 0.3rem;
`;

const Panel = (props) => {
  Panel.defaultProps = {
    timerType: "Stopwatch",
  };
  return (
    <Container type={props.timerType} className="mainPanel">
      {props.children}
    </Container>
  );
};

Panel.propTypes = {
  timerType: PropTypes.string,
};

export default Panel;
