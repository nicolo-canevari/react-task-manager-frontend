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

    // Se la proprietà show è false, non renderizza nulla
    if (!show) return null;

    // Renderizza il modal usando React Portal nel nodo con id "modal-root"
    return ReactDOM.createPortal(

        // Overlay semitrasparente che copre tutta la pagina
        <div className="modal-overlay">

            {/* Contenuto principale del modal */}
            <div className="modal-content">

                {/* Titolo del modal */}
                <h2>{title}</h2>

                {/* Contenuto testuale o descrizione */}
                <p>{content}</p>

                {/* Contenitore dei bottoni */}
                <div className="modal-buttons">

                    {/* Bottone per chiudere il modal senza confermare */}
                    <button onClick={onClose}>Annulla</button>
                    {/* Bottone per confermare l’azione */}
                    <button onClick={onConfirm}>{confirmText}</button>

                </div>

            </div>

        </div>,

        document.getElementById("modal-root")

    );

}