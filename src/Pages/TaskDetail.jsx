import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import Modal from "../Components/Modal";
import EditTaskModal from "../Components/EditTaskModal";

// Componente che mostra i dettagli di un singolo task
export default function TaskDetail() {

    // Estrae l'id del task dai parametri dell'URL
    const { id } = useParams();

    // Hook per reindirizzare l’utente 
    const navigate = useNavigate();

    // Ottiene la lista globale dei task dal context
    const { tasks, setTasks, removeTask, updateTask } = useContext(GlobalContext);

    const [showDeleteModal, setShowDeleteModal] = useState(false); // Stato per la modale di eliminazione
    const [showEditModal, setShowEditModal] = useState(false);     // Stato per la modale di modifica

    // Cerca il task corrispondente all'id ottenuto dalla URL
    const task = tasks.find((t) => t.id === parseInt(id));

    // Se il task non esiste (es. URL errato), mostra un messaggio
    if (!task) {
        return <p>Task non trovata.</p>;
    }

    // Funzione chiamata quando si preme il pulsante "Elimina Task"
    const handleDeleteConfirm = async () => {
        try {

            // Chiama la funzione per rimuovere il task dal backend o dallo stato globale
            await removeTask(task.id);
            // Mostra un messaggio di conferma all'utente
            alert("Task eliminata con successo.");
            // Aggiorna lo stato globale dei task rimuovendo quello eliminato
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
            // Reindirizza l'utente alla pagina principale (home)
            navigate("/");
        } catch (err) {
            // Se c'è un errore, mostra un messaggio all'utente
            alert(err.message || "Errore durante l'eliminazione.");
        }

    };

    // Funzione chiamata al salvataggio del task modificato
    const handleSaveEdit = async (updatedTask) => {

        try {

            await updateTask(updatedTask); // aggiorna sul backend 
            setTasks((prev) =>
                prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );

            setShowEditModal(false); // chiude la modale
            alert("Task aggiornato con successo.");

        } catch (err) {
            alert(err.message || "Errore durante l'aggiornamento.");
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

            <div className="task-actions">

                {/* Bottone per modificare */}
                <button className="edit-button" onClick={() => setShowEditModal(true)}>Modifica Task</button>

                {/* Bottone per eliminare */}
                <button className="delete-button" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

            </div>

            {/* Modale eliminazione */}
            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questo task? L'operazione non può essere annullata."
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                confirmText="Elimina"
            />

            {/* Modale modifica */}
            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleSaveEdit}
            />

        </div>

    );

}