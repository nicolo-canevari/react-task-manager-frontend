import React from "react";
import ReactDOM from "react-dom";

export default function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma",
}) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}