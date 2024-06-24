import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef();
  const dialogRef = useRef();

  const targetTimeInMillis = targetTime * 1000;
  const [remainingTime, setRemainingTime] = useState(targetTimeInMillis);

  const isRunning = remainingTime > 0 && remainingTime < targetTimeInMillis;
  if (remainingTime == 0) {
    handleGameEnd();
  }

  function handleStart() {
    timerRef.current = setInterval(() => {
      setRemainingTime((remainingTime) => remainingTime - 10);
    }, 10);
  }

  function handleStop() {
    handleGameEnd();
  }

  function handleGameEnd() {
    clearInterval(timerRef.current);
    dialogRef.current.open();
  }

  function handleResetRemainingTime() {
    setRemainingTime(targetTimeInMillis);
  }

  return (
    <>
      <ResultModal
        remainingTime={remainingTime}
        targetTime={targetTime}
        ref={dialogRef}
        onResetRemainingTime={handleResetRemainingTime}
      />
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
