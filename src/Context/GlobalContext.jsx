import { createContext } from "react";
// const { VITE_API_URL } = import.meta.env;
import useTasks from "../Hooks/useTask";

// Crea il contesto
export const GlobalContext = createContext();

// export default function GlobalProvider({ children }) {
//     // Stato globale per i task
//     const [tasks, setTasks] = useState([]);

//     // Recupera i task all'avvio
//     useEffect(() => {
//         fetch(`${VITE_API_URL}/tasks`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Tasks ricevuti:", data); // Debug
//                 setTasks(data); // Salva nello stato
//             })
//             .catch((err) => console.error("Errore nel fetch:", err));
//     }, []);

//     return (
//         <GlobalContext.Provider value={{ tasks, setTasks }}>
//             {children}
//         </GlobalContext.Provider>
//     );
// }


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