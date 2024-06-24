import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(
  ({ remainingTime, targetTime, onResetRemainingTime }, ref) => {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialogRef.current.showModal();
        },
      };
    });

    return (
      <dialog className="result-modal" ref={dialogRef}>
        <h2>You {remainingTime !== 0 ? "won!" : "lost"}</h2>
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
