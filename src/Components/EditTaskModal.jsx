import React, { useState, useRef } from "react";
import Modal from "./Modal";

// Componente che mostra una modale per modificare un task
export default function EditTaskModal({ show, onClose, task, onSave }) {

    // Stati locali per gestire i campi del form (valori controllati)
    const [title, setTitle] = useState(task.title);  // Titolo del task
    const [description, setDescription] = useState(task.description);  // Descrizione del task
    const [status, setStatus] = useState(task.status);  // Stato (To do, Doing, Done)

    // useRef usato per accedere al form e inviarlo manualmente tramite un bottone esterno al form stesso
    const editFormRef = useRef();

    // Funzione chiamata alla conferma del form (submit)
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita il refresh della pagina

        // Crea un oggetto aggiornato con i nuovi valori e lo passa alla funzione di salvataggio
        onSave({
            ...task,         // Mantiene gli altri dati del task (come id)
            title,           // Nuovo titolo
            description,     // Nuova descrizione
            status,          // Nuovo stato
        });
    };

    // Il componente restituisce una modale che contiene un form per modificare il task
    return (

        <Modal

            // Controlla se la modale è visibile
            show={show}

            // Funzione da chiamare per chiudere la modale
            onClose={onClose}

            // Forza il submit del form quando si clicca "Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}

            // Titolo della modale
            title="Modifica Task"

            // Testo del bottone di conferma
            confirmText="Salva"

            content={
                // Form di modifica del task
                <form onSubmit={handleSubmit} ref={editFormRef} className="edit-task-form">

                    {/* Campo titolo */}
                    <div className="form-group">
                        <label htmlFor="title">Titolo:</label>
                        <input
                            id="title"
                            type="text"
                            className="form-input"
                            value={title}   // Valore controllato
                            onChange={(e) => setTitle(e.target.value)}  // Aggiorna lo stato
                            required   // Campo obbligatorio
                        />
                    </div>

                    {/* Campo descrizione */}
                    <div className="form-group">
                        <label htmlFor="description">Descrizione:</label>
                        <textarea
                            id="description"
                            className="form-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Campo selezione stato */}
                    <div className="form-group">
                        <label htmlFor="status">Stato:</label>
                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}   // Aggiorna lo stato selezionato
                        >
                            <option>To do</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    </div>

                </form>

            }

        />

    );
}