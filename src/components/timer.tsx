"use client";
import React, { useLayoutEffect, useState } from "react";
type TimerProps = {
  className?: string;
};
const Timer: React.FC<TimerProps> = ({}) => {
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span
      className="text-sm text-muted-foreground ml-4"
      suppressHydrationWarning={true}
    >
      {currentTime}
    </span>
  );
};

export default Timer;
