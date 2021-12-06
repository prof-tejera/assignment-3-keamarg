import { css } from "styled-components";
import { COLORS, TIMERS } from "../utils/helpers";

//buttons

export const SettingsBtn = css`
  z-index: 1;
  font-size: 1.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
`;

export const ReadyBtn = css`
  z-index: 1;
  font-size: 3rem;
  bottom: 1rem;
  //   margin: 0 auto;
  background-color: transparent;
  animation: PulseAnim2 1s ease forwards;
`;

export const NotReadyBtn = css`
  z-index: 1;
  font-size: 3rem;
  bottom: 1rem;
  //   margin: 0 auto;
  background-color: transparent;
  opacity: 0.1;
  :hover {
    opacity: 0.2;
  }
`;

export const BackBtn = css`
  z-index: 1;
  font-size: 1.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
`;

//animations
export const PulseAnim = css`
  @keyframes PulseAnim {
    0% {
      color: ${COLORS.stop};
      transform: scale(1);
    }
    10% {
      color: ${COLORS.stop};
      transform: scale(1.1);
    }

    100% {
      color: ${COLORS.stop};
      transform: scale(1);
    }
  }
`;

export const PulseAnim2 = css`
  @keyframes PulseAnim2 {
    0% {
      color: ${COLORS.text};
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      color: ${COLORS.text};
    }
  }
`;

export const ColorAnim = css`
  @keyframes ColorAnim {
    0% {
      color: black;
    }
    100% {
      color: ${COLORS.stop};
    }
  }
`;

export const FadeIn = css`
  @keyframes FadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Bounce = css`
  @keyframes Bounce {
    0% {
      top: 0rem;
    }
    25% {
      top: 0.5rem;
    }
    50% {
      top: 0rem;
    }
    75% {
      top: 0.5rem;
    }
    100% {
      top: 0rem;
    }
  }
`;

export const QueueStyle = css`
  width: 20rem;
  flex-direction: column;
  align-self: flex-start;
  user-select: none;

  .${TIMERS.stopwatch} {
    background-color: ${COLORS.stopwatch};
  }
  .${TIMERS.countdown} {
    background-color: ${COLORS.countdown};
  }
  .${TIMERS.xy} {
    background-color: ${COLORS.xy};
  }
  .${TIMERS.tabata} {
    background-color: ${COLORS.tabata};
  }
  .empty {
    background-color: rgba(112, 112, 112, 0.5);
  }
  .loadBtn {
    text-align: right;
    float: right;
  }
  .Stopwatch:hover,
  .Countdown:hover,
  .XY:hover,
  .Tabata:hover {
    // background-color: rgba(255, 0, 0, 0.3);
    opacity: 0.5;
  }
  .Stopwatch:hover::before,
  .Countdown:hover::before,
  .XY:hover::before,
  .Tabata:hover::before {
    content: "\u2716";
    text-align: right;
    float: right;
    color: rgba(255, 0, 0, 0.8);
  }
`;
