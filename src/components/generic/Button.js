import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS, BUTTONS, BTNTYPE } from "../../utils/helpers";

const Btn = styled.button`
  border-radius: 0.3rem;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLORS.text};
  transition: 0.2s ease;
  :hover {
    opacity: 0.6;
  }

  background-color: ${(props) =>
    props.value === BTNTYPE.start
      ? COLORS.start
      : props.value === BTNTYPE.stop
      ? COLORS.stop
      : COLORS.reset};
`;

const Button = (props) => {
  Button.defaultProps = {
    styleName: "none",
    value: "none",
    onClick: null,
  };
  const { value, styleName, onClick, inner } = props;
  return (
    <Btn className={styleName} value={value} onClick={onClick}>
      {inner}
      <i className={BUTTONS[value] ? BUTTONS[value] : BUTTONS.start}></i>
    </Btn>
  );
};
Button.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
