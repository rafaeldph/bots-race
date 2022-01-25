export const formatNumber = (number, decimal_point = 2) => {
  return Math.round(number * Math.pow(10, decimal_point)) / Math.pow(10, decimal_point);
};

const addLeadingZeroIfNeeded = (number) => {
  if (number == 0) return '00';
  if (number < 10) return `0${number}`;
  return number;
}
export const formatTime = (time) => {
  return [addLeadingZeroIfNeeded(parseInt(time / 60)), addLeadingZeroIfNeeded(time % 60)].join(':');
};
