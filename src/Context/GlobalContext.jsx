import { createContext } from "react";
// const { VITE_API_URL } = import.meta.env;
import useTasks from "../Hooks/useTask";

// Crea il contesto
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    // Usa il custom hook
    // const { tasks, addTask, removeTask, updateTask } = useTasks();
    const taskData = useTasks();

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );
}