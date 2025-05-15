import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

// Componente che mostra i dettagli di un singolo task
export default function TaskDetail() {

    // Estrae l'id del task dai parametri dell'URL
    const { id } = useParams();

    // Hook per reindirizzare l’utente 
    const navigate = useNavigate();

    // Ottiene la lista globale dei task dal context
    const { tasks, setTasks, removeTask } = useContext(GlobalContext);

    // Cerca il task corrispondente all'id ottenuto dalla URL
    const task = tasks.find((t) => t.id === parseInt(id));

    // Se il task non esiste (es. URL errato), mostra un messaggio
    if (!task) {
        return <p>Task non trovata.</p>;
    }

    // Funzione chiamata quando si preme il pulsante "Elimina Task"
    const handleDelete = async () => {
        if (confirm("Sei sicuro di voler eliminare questo task?")) {
            try {
                // Chiama la funzione per eliminare il task
                await removeTask(task.id);

                // Mostra un messaggio di conferma
                alert("Task eliminata con successo.");

                // Aggiorna il contesto rimuovendo il task
                setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

                // Reindirizza alla home
                navigate("/");
            } catch (err) {
                // Mostra un messaggio di errore se qualcosa va storto
                alert(err.message || "Errore durante l'eliminazione.");
            }
        }
    };

    return (
        <div className="task-detail-container">
            <h2 className="task-detail-title">Dettagli Task</h2>
            <div className="task-info">
                <p><strong className="task-name">Nome:</strong> {task.title}</p>
                <p><strong className="task-name">Descrizione:</strong> {task.description}</p>
                <p><strong className="task-name">Stato:</strong>
                    <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
                </p>
                <p><strong className="task-name">Creato il:</strong> {new Date(task.createdAt).toLocaleString()}</p>
            </div>

            {/* Bottone per eliminare il task */}
            <button className="delete-button" onClick={handleDelete}>Elimina Task</button>
        </div>
    );
}