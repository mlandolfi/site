const getPartitionIndexes = ({
  currentScroll,
  lastScroll,
  partitions,
}: {
  currentScroll: number;
  lastScroll: number;
  partitions: number[];
}): {
  currentPartitionIndex: number;
  lastPartitionIndex: number;
  percentThrough: number;
} => {
  let currentPartitionIndex = -1,
    lastPartitionIndex = -1;
  for (let i = 0; i < partitions.length; i++) {
    if (currentScroll < partitions[i] && currentPartitionIndex === -1) {
      currentPartitionIndex = i - 1;
    }
    if (lastScroll < partitions[i] && lastPartitionIndex === -1) {
      lastPartitionIndex = i - 1;
    }
  }

  return {
    currentPartitionIndex,
    lastPartitionIndex,
    percentThrough: currentPartitionIndex / partitions.length,
  };
};

// ============================================================ //
//                         Handlers                             //
//==============================================================//

const welcomeBannerPartitions = Array.from({ length: 90 }, (_, i) => i * 10);
export const handleForWelcomeBanner = (
  currentScroll: number,
  lastScroll: number
) => {
  const { currentPartitionIndex, lastPartitionIndex } = getPartitionIndexes({
    currentScroll,
    lastScroll,
    partitions: welcomeBannerPartitions,
  });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const header = document.getElementById("welcome-banner");
    if (header) {
      if (currentPartitionIndex === -1) {
        header.style.display = "none";
        return;
      }
      header.style.display = "block";

      header.style.transform = `rotateX(${
        currentPartitionIndex * (90 / welcomeBannerPartitions.length)
      }deg) translateY(-${
        currentPartitionIndex * (200 / welcomeBannerPartitions.length)
      }px) translateZ(${
        currentPartitionIndex * (150 / welcomeBannerPartitions.length)
      }px)`;
    }
  }
};

const introPartitions = Array.from({ length: 90 }, (_, i) => i * 10 + 500);
export const handleForIntro = (currentScroll: number, lastScroll: number) => {
  const { currentPartitionIndex, lastPartitionIndex } = getPartitionIndexes({
    currentScroll,
    lastScroll,
    partitions: introPartitions,
  });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const intro = document.getElementById("intro-banner");
    if (intro) {
      if (currentPartitionIndex === -1) {
        return;
      }
      intro.style.display = "flex";

      intro.style.transform = `rotateX(${
        270 + (currentPartitionIndex * 90) / introPartitions.length
      }deg) translateY(${
        (introPartitions.length - currentPartitionIndex) *
        (200 / introPartitions.length)
      }px) translateZ(${
        (introPartitions.length - currentPartitionIndex) *
        (200 / introPartitions.length)
      }px)`;
    }
  }
};

const introString = " I'm Mike";
const deleteIntroPartitions = Array.from(
  { length: 30 },
  (_, i) => i * 30 + 1600
);
export const handleForDeleteIntro = (
  currentScroll: number,
  lastScroll: number
) => {
  const { currentPartitionIndex, lastPartitionIndex } = getPartitionIndexes({
    currentScroll,
    lastScroll,
    partitions: deleteIntroPartitions,
  });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const intro = document.getElementById("intro-banner");
    if (intro) {
      if (currentPartitionIndex === -1) {
        return;
      }
      intro.style.display = "flex";

      const remainingIntro = introString.slice(
        0,
        Math.floor(
          ((deleteIntroPartitions.length - currentPartitionIndex) /
            deleteIntroPartitions.length) *
            introString.length
        )
      );
      intro.innerText = remainingIntro;
    }
  }
};

const writeAboutPartitions = Array.from(
  { length: 50 },
  (_, i) => i * 20 + 2500
);
const writeAboutString = "This is my website   ";
export const handleForWriteAbout = (
  currentScroll: number,
  lastScroll: number
) => {
  const { currentPartitionIndex, lastPartitionIndex } = getPartitionIndexes({
    currentScroll,
    lastScroll,
    partitions: writeAboutPartitions,
  });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const intro = document.getElementById("intro-banner");
    if (intro) {
      if (currentPartitionIndex === -1) {
        return;
      }
      intro.style.display = "flex";

      const writeAbout = writeAboutString.slice(
        0,
        Math.floor(
          (currentPartitionIndex / writeAboutPartitions.length) *
            writeAboutString.length
        )
      );
      intro.innerText = writeAbout;
    }
  }
};

const removeAboutPartitions = Array.from(
  { length: 90 },
  (_, i) => i * 10 + 3700
);
export const handleForRemoveAbout = (
  currentScroll: number,
  lastScroll: number
) => {
  const { currentPartitionIndex, lastPartitionIndex, percentThrough } =
    getPartitionIndexes({
      currentScroll,
      lastScroll,
      partitions: removeAboutPartitions,
    });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const intro = document.getElementById("intro-banner");
    if (intro) {
      if (currentPartitionIndex === -1) {
        intro.style.display = "none";
        return;
      }
      intro.style.display = "flex";

      intro.style.opacity = `${1 - percentThrough}`;
    }
  }
};

const wipPartitions = Array.from({ length: 90 }, (_, i) => i * 10 + 4400);
export const handleForWIP = (currentScroll: number, lastScroll: number) => {
  const { currentPartitionIndex, lastPartitionIndex, percentThrough } =
    getPartitionIndexes({
      currentScroll,
      lastScroll,
      partitions: wipPartitions,
    });
  if (currentPartitionIndex !== lastPartitionIndex) {
    const intro = document.getElementById("wip-banner");
    if (intro) {
      if (currentPartitionIndex === -1) {
        return;
      }
      intro.style.display = "flex";

      intro.style.opacity = `${percentThrough}`;
    }
  }
};
