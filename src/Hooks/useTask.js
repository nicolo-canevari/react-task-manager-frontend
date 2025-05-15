import { useEffect, useState } from "react";
// Estrae la variabile dell'URL dell'API dall'ambiente
const { VITE_API_URL } = import.meta.env;

// Hook personalizzato che gestisce il recupero e la manipolazione dei task
export default function useTasks() {

    // Stato locale che contiene l'elenco dei task
    const [tasks, setTasks] = useState([]);

    // useEffect eseguito solo al primo render del componente
    useEffect(() => {

        // Effettua una richiesta GET per recuperare i task dal server
        fetch(`${VITE_API_URL}/tasks`)
            .then((res) => res.json()) // Converte la risposta in JSON
            .then((data) => {
                console.log("Tasks ricevuti:", data); // Debug
                setTasks(data); // Aggiorna lo stato con i task ricevuti
            })
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    // Funzione per aggiungere un nuovo task
    const addTask = async (newTask) => {

        try {

            // Effettua una chiamata POST per creare un nuovo task
            const response = await fetch(`${VITE_API_URL}/tasks`, {

                // Metodo POST per inviare nuovi dati
                method: "POST",
                headers: {
                    // Specifica che il contenuto è in formato JSON
                    "Content-Type": "application/json",
                },
                // Converte l'oggetto newTask in stringa JSON
                body: JSON.stringify(newTask),
            });

            // Converte la risposta in oggetto JS
            const data = await response.json();

            // Se il server risponde con success: true
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Errore nella creazione del task.");
            }

            setTasks(prev => [...prev, data.task]);

        } catch (err) {
            // Propaga l'errore al chiamante
            throw new Error(err.message || "Errore nella creazione del task.");
        }
    };


    // Funzione per la rimozione di un task 
    const removeTask = async (taskId) => {

        try {
            // Effettua una richiesta DELETE al server per eliminare il task con l'id specificato
            const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });

            // Converte la risposta in oggetto JavaScript
            const data = await response.json();

            // Controlla se la risposta è andata a buon fine
            if (!response.ok || !data.success) {
                // Se la risposta è negativa o il campo success è false, lancia un errore
                throw new Error(data.message || "Errore durante l'eliminazione del task.");
            }

            // Rimuove il task dallo stato
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (err) {
            // In caso di errore, lancia un nuovo errore con il messaggio
            throw new Error(err.message || "Errore durante l'eliminazione del task.");
        }

    };


    // Funzione per aggiornare un task esistente
    const updateTask = async (updatedTask) => {

        try {

            // Richiesta PUT per aggiornare il task specificato
            const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
                method: "PUT", // Metodo per aggiornare risorse
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask), // Invia la task aggiornata al server
            });

            const data = await response.json();  // Parsing della risposta

            if (data.success) {

                // Aggiorna la task nello stato globale: sostituisce il task vecchio con quello aggiornato
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === updatedTask.id ? data.task : task
                    )
                );
            } else {
                throw new Error(data.message || "Errore durante l'aggiornamento");
            }
        } catch (err) {
            throw new Error(err.message || "Errore durante l'aggiornamento");
        }

    };


    // Espone funzioni e stato globale
    return {
        tasks,        // Lista dei task
        setTasks,     // Setter diretto dello stato 
        addTask,      // Funzione per aggiungere un task
        removeTask,   // Funzione per rimuovere un task
        updateTask,   // Funzione per modificare un task
    };
}