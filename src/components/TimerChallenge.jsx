import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef();
  const dialogRef = useRef();

  const targetTimeInMillis = targetTime * 1000;
  const [remainingTime, setRemainingTime] = useState(targetTimeInMillis);

  const isRunning = remainingTime > 0 && remainingTime < targetTimeInMillis;
  if (remainingTime == 0) {
    clearInterval(timerRef.current);
    setRemainingTime(targetTimeInMillis);
  }

  function handleStart() {
    timerRef.current = setInterval(() => {
      setRemainingTime((remainingTime) => remainingTime - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timerRef.current);
    setRemainingTime(targetTimeInMillis);
  }

  return (
    <>
      <ResultModal result="lost" targetTime={targetTime} ref={dialogRef} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isRunning ? handleStop : handleStart}>
            {isRunning ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isRunning ? "active" : undefined}>
          {isRunning ? "Time is running..." : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
