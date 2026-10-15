"use client";

import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const timeSince = 1782770400000;

  useEffect(() => {
    const interval = setInterval(() => {
      const timeNow = new Date();
      const timeDif = timeNow.getTime() - timeSince;

      const days = Math.floor(timeDif / (1000 * 60 * 60 * 24));
      const hours = Math.floor(timeDif / (1000 * 60 * 60)) % 24;
      const minutes = Math.floor(timeDif / (1000 * 60)) % 60;
      const seconds = Math.floor(timeDif / 1000) % 60;

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {time.days.toString().padStart(2, "0")} Days | {time.hours.toString().padStart(2, "0")}:
      {time.minutes.toString().padStart(2, "0")}:{time.seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default Clock;
