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

    // Funzioni 
    const addTask = (newTask) => {

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