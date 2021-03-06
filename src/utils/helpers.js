// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

//Colors used
export const COLORS = {
  countdown: "#316E94",
  stopwatch: "#3FA2E0",
  xy: "#E0BB34",
  tabata: "#4E1394",
  purple: "#7C28E0",
  start: "#26DB5C",
  stop: "#DB4E4E",
  reset: "#2F333B",
  text: "#FAF9F6",
  nav: "#231F20",
};

//Bootstrap icons for the buttons
export const BUTTONS = {
  reset: "bi bi-arrow-counterclockwise",
  start: "bi bi-play-circle",
  stop: "bi bi-pause-circle",
  settings: "bi bi-gear",
  forward: "bi bi-skip-forward-circle",
  ready: "bi bi-check-circle",
  back: "bi bi-arrow-left-circle",
  notReady: "bi bi-circle",
  add: "bi bi-plus-circle",
  arrowUp: "bi bi-arrow-up-circle-fill",
  queue: "bi bi-stack",
  limit: "bi bi-x-circle",
};

export const BTNTYPE = {
  reset: "reset",
  start: "start",
  stop: "stop",
  settings: "settings",
  forward: "forward",
  ready: "ready",
  back: "back",
  notReady: "notReady",
  add: "add",
  arrowUp: "arrowUp",
  queue: "queue",
  limit: "limit",
};

export const TIMERS = {
  stopwatch: "Stopwatch",
  countdown: "Countdown",
  xy: "XY",
  tabata: "Tabata",
};

export const MESSAGES = {
  finished: "Well done!",
  settimer: "Check your settings",
  rest: "Rest now",
  work: "Work!",
  work2: "Back to work!",
  boost1: "Almost there!",
  boost2: "That's more like it!",
  boost3: "Ya call that working?",
  boost4: "Come on!",
  boost5: "Keep going!",
};

export const STATUS = {
  completed: "completed",
  running: "running",
  notRunning: "notRunning",
};

// Function for converting the seconds to a more human friendly format
export const timerValue = (value, timer) => {
  const fullTime = new Date(value * 1000).toISOString();
  const hours = fullTime.substr(12, 1);
  const minutes = fullTime.substr(14, 2);
  const seconds = fullTime.substr(17, 2);
  const deciSeconds = fullTime.substr(20, 1);
  if (timer) {
    return [hours, minutes, seconds, deciSeconds];
  } else {
    return hours + "h " + minutes + "m " + seconds + "s";
  }
};

// Function providing messages
export const getMessage = (currentRound) => {
  switch (currentRound) {
    case 1:
      return MESSAGES.finished;
    case 2:
      return MESSAGES.boost1;
    case 3:
      return MESSAGES.boost2;
    case 4:
      return MESSAGES.boost3;
    case 5:
      return MESSAGES.boost4;
    default:
      return MESSAGES.boost5;
  }
};
