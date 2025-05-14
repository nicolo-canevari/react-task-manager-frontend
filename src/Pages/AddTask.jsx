import React, { useRef, useState } from "react";
import useTasks from "../Hooks/useTask";

// Simboli non ammessi nel titolo 
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    // Stato controllato per il titolo
    const [title, setTitle] = useState("");

    // Stato per eventuali errori di validazione
    const [error, setError] = useState("");

    // Ref per accedere direttamente alla textarea (descrizione)
    const descriptionRef = useRef();

    // Ref per accedere al valore selezionato nel select (stato)
    const statusRef = useRef();

    // Funzione per aggiungere una nuova task (dal custom hook)
    const { addTask, fetchTasks } = useTasks(); // fetchTasks per aggiornare la lista

    // Funzione eseguita al submit del form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita il refresh della pagina

        // Validazione: il titolo non deve essere vuoto
        if (!title.trim()) {
            setError("Il nome del task non può essere vuoto.");
            return;
        }

        // Crea un oggetto task con i dati inseriti
        const newTask = {
            title: title.trim(),
            description: descriptionRef.current?.value.trim() || "",
            status: statusRef.current?.value || "To do",
            createdAt: new Date().toISOString(), // Data corrente in formato ISO
        };

        try {
            // Aggiunge la task tramite API
            await addTask(newTask);

            // Mostra conferma
            alert("Task creata con successo!");

            // Resetta i campi del form
            setTitle("");
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (statusRef.current) statusRef.current.value = "To do";
            setError("");

            // Aggiorna la lista delle task dopo l'aggiunta
            await fetchTasks();

        } catch (err) {
            // Gestione dell'errore
            alert(err.message || "Errore durante la creazione del task.");
        }
    };

    return (
        <div>
            <h1>Aggiungi un nuovo Task</h1>

            <form onSubmit={handleSubmit}>

                {/* Campo input per il titolo */}
                <div>
                    <label htmlFor="title">Nome del Task:</label><br />
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Stato controllato
                    />
                </div>

                {/* Messaggio di errore */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Campo textarea per descrizione */}
                <div>
                    <label htmlFor="description">Descrizione:</label><br />
                    <textarea id="description" ref={descriptionRef} />
                </div>

                {/* Campo select per stato */}
                <div>
                    <label htmlFor="status">Stato:</label><br />
                    <select id="status" ref={statusRef} defaultValue="To do">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* Bottone per inviare */}
                <button type="submit">Aggiungi Task</button>
            </form>
        </div>
    );
}
