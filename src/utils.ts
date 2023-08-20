export const getRandomBetween = (
  min: number,
  max: number,
  forceInt?: boolean
): number => {
  const rand = Math.random() * (max - min) + min;
  return forceInt ? Math.floor(rand) : rand;
};
