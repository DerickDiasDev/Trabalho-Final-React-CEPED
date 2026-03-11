import { useEffect, useId, useRef } from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    dialogRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon" aria-hidden="true">
          🗑️
        </div>
        <h3 id={titleId} className="modal-title">
          {title}
        </h3>
        <p id={descriptionId} className="modal-text">
          {message}
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
