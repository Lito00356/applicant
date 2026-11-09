"use client";

import { ElapsedTimerProps } from "@/src/app/lib/types";
import { useEffect, useState } from "react";

const ElapsedTimer = ({ startDate }: ElapsedTimerProps) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const elapsedMs = Date.now() - startDate;

      setTime({
        days: Math.floor(elapsedMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor(elapsedMs / (1000 * 60 * 60)) % 24,
        minutes: Math.floor(elapsedMs / (1000 * 60)) % 60,
        seconds: Math.floor(elapsedMs / 1000) % 60,
      });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <span>
      {time.days.toString().padStart(2, "0")} Days | {time.hours.toString().padStart(2, "0")}:
      {time.minutes.toString().padStart(2, "0")}:{time.seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default ElapsedTimer;
