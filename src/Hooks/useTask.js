import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    // Recupera i task all'avvio
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Tasks ricevuti:", data); // Debug
                setTasks(data); // Salva nello stato
            })
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    // Funzione per aggiungere un nuovo task
    const addTask = async (newTask) => {
        try {
            // Effettua una chiamata POST per creare un nuovo task
            const response = await fetch(`${VITE_API_URL}/tasks`, {
                // Metodo POST per creare dati
                method: "POST",
                headers: {
                    // Specifica il tipo di contenuto
                    "Content-Type": "application/json",
                },
                // Invia il nuovo task come JSON
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


    const removeTask = (taskId) => {

    };

    const updateTask = (updatedTask) => {

    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };

}