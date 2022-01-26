export const calculateDistance = (a, b) => {
  return Math.pow(Math.pow((b?.x ?? 0) - (a?.x ?? 0), 2) + Math.pow((b?.y ?? 0) - (a?.y ?? 0), 2), 0.5);
};

export const calculateAngle = (a, b) => {
  return Math.atan2(b.x - a.x, b.y - a.y);
};
