export const getRandomBetween = (
  min: number,
  max: number,
  forceInt?: boolean
): number => {
  const rand = Math.random() * (max - min) + min;
  return forceInt ? Math.floor(rand) : rand;
};

export const throttleFn = (
  func: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]): void => {
    const now = Date.now();

    const later = () => {
      lastCall = now;
      func(...args);
    };

    if (now - lastCall < delay) {
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    } else {
      later();
    }
  };
};
