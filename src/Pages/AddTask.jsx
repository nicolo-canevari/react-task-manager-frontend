import React, { useRef, useState, useMemo } from "react";
import useTasks from "../Hooks/useTask";

// Caratteri vietati nel titolo
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    // Stato controllato per il titolo del task
    const [title, setTitle] = useState("");

    // Stato per gestire messaggi di errore di validazione
    const [error, setError] = useState("");

    // Ref per accedere direttamente al valore della textarea (campo descrizione)
    const descriptionRef = useRef();

    // Ref per accedere direttamente al valore del select (campo stato)
    const statusRef = useRef();

    // Usa la funzione addTask dall’hook
    const { addTask } = useTasks();

    // Memoizzazione del task (viene ricreato solo se cambia title)
    const newTask = useMemo(() => {
        return {

            title: title.trim(),  // Rimuove eventuali spazi bianchi

            // Accesso sicuro al valore della textarea
            description: descriptionRef.current?.value.trim() || "",

            // Stato selezionato oppure "To do" di default
            status: statusRef.current?.value || "To do",

            // Data corrente in formato ISO
            createdAt: new Date().toISOString(),

        };
    }, [title]); // Ricalcola solo se cambia `title`

    const handleSubmit = async (e) => {

        e.preventDefault();   // Evita refresh pagina

        // Controllo: il titolo non deve essere vuoto
        if (!title.trim()) {
            setError("Il nome del task non può essere vuoto.");
            return;
        }

        try {
            // Chiamata API per creare la task
            await addTask(newTask);

            // Se ok, resetta campi e mostra conferma
            alert("Task creata con successo!");

            setTitle(""); // Reset titolo
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (statusRef.current) statusRef.current.value = "To do";
            setError(""); // Pulisce errori

        } catch (err) {
            // Mostra errore se lanciato da addTask()
            alert(err.message || "Errore durante la creazione del task.");
        }

    };

    return (
        <div>
            <h1>Aggiungi un nuovo Task</h1>

            <form onSubmit={handleSubmit}>

                {/* Campo input per il titolo del task */}
                <div>
                    <label htmlFor="title">Nome del Task:</label><br />
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Aggiorna lo stato al digitare
                    />
                </div>

                {/* Mostra messaggio di errore se presente */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Campo textarea per la descrizione del task */}
                <div>
                    <label htmlFor="description">Descrizione:</label><br />
                    <textarea id="description" ref={descriptionRef} />
                </div>

                {/* Campo select per scegliere lo stato del task */}
                <div>
                    <label htmlFor="status">Stato:</label><br />
                    <select id="status" ref={statusRef} defaultValue="To do">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* Bottone per inviare il form */}
                <button type="submit">Aggiungi Task</button>

            </form>
        </div>
    );
}