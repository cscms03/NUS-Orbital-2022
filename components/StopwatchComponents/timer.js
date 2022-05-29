const padToTwo = (num) => (num <= 9 ? `0${num}` : num);

export const displayTime = (centiseconds) => {
  let minutes = 0;
  let seconds = 0;

  if (centiseconds < 0) {
    centiseconds = 0;
  }

  if (centiseconds < 100) {
    return `00:00:${padToTwo(centiseconds)}`;
  }

  let centiSecsRemainder = centiseconds % 100;
  seconds = (centiseconds - centiSecsRemainder) / 100;

  if (seconds < 60) {
    return `00:${padToTwo(seconds)}:${padToTwo(centiSecsRemainder)}`;
  }

  let secondsRemainder = seconds % 60;
  minutes = (seconds - secondsRemainder) / 60;

  return `${padToTwo(minutes)}:${padToTwo(secondsRemainder)}:${padToTwo(
    centiSecsRemainder
  )}`;
};
