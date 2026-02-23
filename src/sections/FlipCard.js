import { useEffect, useState } from "react";

const FlipCard = ({ value, label }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);

      const timeout = setTimeout(() => {
        setIsFlipping(false);
        setPrevValue(value);
      }, 600); // match CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  const formattedPrev = prevValue.toString().padStart(2, "0");
  const formattedNew = value.toString().padStart(2, "0");

  return (
    <div className="calendar-container">
      <div className="flip-card">
        {/* Static top */}
        <div className="top"><div className="number">{formattedPrev}</div></div>

        {/* Static bottom */}
        <div className="bottom"><div className="number">{formattedNew}</div></div>

        {/* Animated top half */}
        {isFlipping && <div className="flip-top"><div className="number">{formattedPrev}</div></div>}

        {/* Animated bottom half */}
        {isFlipping && <div className="flip-bottom"><div className="number">{formattedNew}</div></div>}
      </div>

      <div className="label"><h4>{label}</h4></div>
    </div>
  );
};

export default FlipCard;
