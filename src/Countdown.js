import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard";

const Countdown = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    console.log(now)
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft(null);
      clearInterval(interval);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({ days, hours, minutes, seconds });
  }, 1000);

  return () => clearInterval(interval);
}, [weddingDate]);

  if (!timeLeft) {
    return <div className="countdown">È il grande giorno!</div>;
  }

  return (
    <div className="countdown">
      <FlipCard value={timeLeft.days} label="Giorni" />
      <div className="colon">:</div>

      <FlipCard value={timeLeft.hours} label="Ore" />
      <div className="colon">:</div>

      <FlipCard value={timeLeft.minutes} label="Minuti" />
      <div className="colon">:</div>

      <FlipCard value={timeLeft.seconds} label="Secondi" />
    </div>
  );
};

export default Countdown;
