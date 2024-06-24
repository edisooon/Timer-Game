import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(
  ({ remainingTime, targetTime, onResetRemainingTime }, ref) => {
    const dialogRef = useRef();
    const isLost = remainingTime === 0;
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialogRef.current.showModal();
        },
      };
    });

    return (
      <dialog
        className="result-modal"
        ref={dialogRef}
        onClose={onResetRemainingTime}
      >
        {isLost && <h2>You lost</h2>}
        {!isLost && <h2>Your score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with
          <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onResetRemainingTime}>
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default ResultModal;
