export const calculateDistance = (a, b) => {
  return Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2), 0.5);
};

export const calculateAngle = (a, b) => {
  return Math.atan2(b.x - a.x, b.y - a.y);
};
