import React, { useState, useEffect } from "react";

const Countdown = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  if (!timeLeft) return <div className="countdown">È il grande giorno!</div>;

  const units = [
    { label: "Giorni", value: timeLeft.days },
    { label: "Ore", value: timeLeft.hours },
    { label: "Minuti", value: timeLeft.minutes },
    { label: "Secondi", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
        {units.map((unit, idx) => (
        <React.Fragment key={idx}>
            <div className="calendar-square">
            <div className="number">
                {unit.value !== undefined
                ? unit.value.toString().padStart(2, "0")
                : "00"}
            </div>
            <div className="label">{unit.label}</div>
            </div>
            {idx < units.length - 1 && <div className="colon">:</div>}
        </React.Fragment>
        ))}
    </div>
    );
};

export default Countdown;
