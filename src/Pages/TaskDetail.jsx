import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

// Componente che mostra i dettagli di un singolo task
export default function TaskDetail() {

    // Estrae l'id del task dai parametri dell'URL
    const { id } = useParams();

    // Ottiene la lista globale dei task dal context
    const { tasks } = useContext(GlobalContext);

    // Cerca il task corrispondente all'id ottenuto dalla URL
    const task = tasks.find((t) => t.id === parseInt(id));

    // Se il task non esiste (es. URL errato), mostra un messaggio
    if (!task) {
        return <p>Task non trovata.</p>;
    }

    // Funzione chiamata quando si preme il pulsante "Elimina Task"
    const handleDelete = () => {

        console.log("Elimino task");

    };

    return (
        <div>
            <h2>Dettagli Task</h2>
            <p><strong>Nome:</strong> {task.title}</p>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString()}</p>

            {/* Bottone per eliminare il task */}
            <button onClick={handleDelete}>Elimina Task</button>
        </div>
    );
}