import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";

export default function TaskList() {

    // Estrae la lista dei task dallo stato globale
    const { tasks } = useContext(GlobalContext);

    // Stato per criterio di ordinamento: 'title', 'status', 'createdAt'
    const [sortBy, setSortBy] = useState("createdAt");

    // Stato per direzione ordinamento: 1 = crescente, -1 = decrescente
    const [sortOrder, setSortOrder] = useState(1);

    // Ordine predefinito per lo status
    const statusOrder = {
        "To do": 0,
        Doing: 1,
        Done: 2,
    };

    // Funzione chiamata al click sulle intestazioni (th)
    const handleSort = (column) => {

        if (sortBy === column) {
            // Se si clicca sulla stessa colonna, inverte l'ordine
            setSortOrder((prevOrder) => prevOrder * -1);
        } else {
            // Altrimenti cambia colonna e imposta ordine crescente
            setSortBy(column);
            setSortOrder(1);
        }

    };

    // Calcola l'array di task ordinato (memorizzato per performance)
    const sortedTasks = useMemo(() => {

        return [...tasks].sort((a, b) => {

            // Inizializza la variabile 'comp' a 0.
            let comp = 0;

            if (sortBy === "title") {
                // Ordinamento alfabetico (localeCompare)
                comp = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                // Ordinamento basato su statusOrder
                comp = statusOrder[a.status] - statusOrder[b.status];
            } else if (sortBy === "createdAt") {
                // Ordinamento per data (confronto numerico)
                comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return comp * sortOrder; // Applica la direzione di ordinamento

        });

    }, [tasks, sortBy, sortOrder]);  // Ricalcola solo se uno di questi cambia

    return (

        <div>

            <h1>Lista dei Task</h1>

            {/* Tabella per visualizzare i task */}
            <table>
                <thead>
                    <tr>
                        {/* Intestazioni cliccabili per ordinare */}
                        <th
                            onClick={() => handleSort("title")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Nome{" "}
                            {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th
                            onClick={() => handleSort("status")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Stato{" "}
                            {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th
                            onClick={() => handleSort("createdAt")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Data di Creazione{" "}
                            {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* Cicla l'elenco dei task ordinati */}
                    {sortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>

            </table>
        </div>
    );
}
