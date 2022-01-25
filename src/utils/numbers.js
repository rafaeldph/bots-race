export const formatNumber = (number, decimal_point = 2) => {
  return Math.round(number * Math.pow(10, decimal_point)) / Math.pow(10, decimal_point);
};
