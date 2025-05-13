import { createContext, useEffect, useState } from "react";

// Crea il contesto
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    // Stato globale per i task
    const [tasks, setTasks] = useState([]);

    // Recupera i task all'avvio
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/tasks`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Tasks ricevuti:", data); // Debug
                setTasks(data); // Salva nello stato
            })
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}
