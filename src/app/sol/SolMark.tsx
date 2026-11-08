"use client";

import { motion, useReducedMotion } from "framer-motion";

const S_PATH =
  "M629.9 26.9q-92.5 0-155.1-24.4-62.7-24.4-99.6-48.6-36.8-24.2-51.5-24.2-12 0-22.5 14.8-10.6 14.9-21.2 34.4-10.6 19.6-21.6 34.4-11 14.8-23.8 14.8-11 0-18.9-7.3-7.9-7.3-11.2-22.5l-76.9-353.9q-2.3-12.3 1.9-20.9 4.2-8.7 14.8-12.5 11.6-4.4 20.9 0.6 9.3 5 15.8 18.2 60.9 128.6 131.4 203.9 70.5 75.4 147.5 107.9 77.1 32.5 156.7 32.5 113.2 0 178.8-62.4 65.7-62.4 66-170.1 0.3-65.8-28.8-122.2-29.1-56.4-105-107.7-75.9-51.3-215.8-100.3-150.9-53.9-241.5-118.4-90.6-64.6-131.1-145.4-40.4-80.8-40.4-182.9 0-116.3 55.8-203.7 55.7-87.4 154.1-136 98.3-48.5 225.2-48.5 92.9 0 152 21.7 59.1 21.7 93.9 43.7 34.8 22 53.5 22 16.7 0 30-22.1 13.3-22.1 26.9-44.5 13.6-22.4 30.7-22.4 11.1 0 18.6 7 7.5 6.9 12.9 25.7l100 362.5q3.7 13.4-0.3 23.9-4.1 10.4-15.1 14.7-11.3 3.7-20.7-1.1-9.5-4.8-16.2-17-66.4-136.8-138.6-215.7-72.3-78.9-150.4-112.4-78-33.6-161.8-33.6-115 0-186.6 68.4-71.5 68.4-71.5 185.8 0 67.8 29.1 126.5 29.1 58.6 103 111.2 73.8 52.7 207.7 102.9 157.3 57.9 248.2 122.5 91 64.6 129.7 141 38.6 76.5 38.3 170.7-0.3 102-49.3 185.8-49 83.7-142 133.4-93 49.8-226 49.8z";

const CARON_PATH =
  "M573.2 -1620.6l-218.3-125.8q-23.4-13.9-35.7-4-5.4 4.2-6 12.5-0.6 8.3 8.8 18.2l197.5 215.4q14.8 14.8 26.3 23.4 11.5 8.6 27.9 8.6 16.6 0 27.8-8.6 11.1-8.6 25.1-23.4l198-215.4q9.1-9.9 8.7-18.2-0.4-8.3-5.9-12.5-12.8-9.9-36.1 4z";

/** Š ze značky. Háček dvakrát mrkne po načtení a zvedne se, když slovo sedí. */
export function SolMark({ lifted = false }: { lifted?: boolean }) {
  const still = useReducedMotion();

  const wink = {
    y: [0, -44, 0, -44, 0],
    transition: {
      delay: 1.5,
      duration: 0.9,
      times: [0, 0.22, 0.45, 0.67, 1],
      ease: "easeInOut" as const,
    },
  };
  const lift = {
    y: -95,
    rotate: -9,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="22.3 -1897.1 1108.3 2067.8"
      className="sol-mark"
    >
      <defs>
        <linearGradient id="sol-mark-fill" x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#5E2450" />
          <stop offset="0.55" stopColor="#4A1942" />
          <stop offset="1" stopColor="#2A0F26" />
        </linearGradient>
      </defs>
      <path d={S_PATH} fill="url(#sol-mark-fill)" />
      <motion.path
        d={CARON_PATH}
        initial={false}
        animate={lifted ? lift : still ? undefined : wink}
        fill={lifted ? "#C59B68" : "#5E2450"}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}
