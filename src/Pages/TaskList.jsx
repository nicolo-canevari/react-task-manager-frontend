import { useContext, useState, useMemo, useCallback, useRef } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";

export default function TaskList() {

    // Estrae la lista dei task dallo stato globale
    const { tasks } = useContext(GlobalContext);

    // Stato per criterio di ordinamento: 'title', 'status', 'createdAt'
    const [sortBy, setSortBy] = useState("createdAt");

    // Stato per direzione ordinamento: 1 = crescente, -1 = decrescente
    const [sortOrder, setSortOrder] = useState(1);

    // Stato della query di ricerca (viene aggiornata dopo un debounce)
    const [searchQuery, setSearchQuery] = useState("");

    // Riferimento per salvare il timeout del debounce
    const debounceTimeout = useRef(null);

    // Funzione debounce con useCallback
    const handleSearchChange = useCallback((event) => {
        const value = event.target.value;

        // Annulla un eventuale timeout precedente
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Imposta un nuovo timeout per aggiornare `searchQuery`
        debounceTimeout.current = setTimeout(() => {
            setSearchQuery(value);
        }, 500); // debounce di 500ms

    }, []);

    // Mappa per definire l'ordine logico dei valori di "status"
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

    // Filtra e ordina i task in base a searchQuery, sortBy e sortOrder
    const filteredAndSortedTasks = useMemo(() => {

        // Query in minuscolo per confronto case-insensitive
        const lowerQuery = searchQuery.toLowerCase();

        return [...tasks]

            // Filtra in base a searchQuery (case insensitive)
            .filter(task => task.title.toLowerCase().includes(lowerQuery))

            // Ordina in base a sortBy e sortOrder
            .sort((a, b) => {

                let comp = 0;

                if (sortBy === "title") {
                    // Ordina alfabeticamente
                    comp = a.title.localeCompare(b.title);
                } else if (sortBy === "status") {
                    // Ordina secondo la mappa statusOrder
                    comp = statusOrder[a.status] - statusOrder[b.status];
                } else if (sortBy === "createdAt") {
                    // Ordina per data di creazione (timestamp)
                    comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }

                return comp * sortOrder; // Applica direzione (ascendente o discendente)

            });

    }, [tasks, searchQuery, sortBy, sortOrder]);

    return (

        <div>

            <h1>Lista dei Task</h1>

            {/* Campo input per la ricerca dei task per nome */}
            <input
                type="text"
                placeholder="Cerca task..."
                onChange={handleSearchChange} // Gestito con debounce
                style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />

            {/* Tabella che mostra i task */}
            <table>
                <thead>
                    <tr>
                        {/* Colonna "Nome", cliccabile per ordinamento */}
                        <th
                            onClick={() => handleSort("title")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Nome {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>

                        {/* Colonna "Stato", cliccabile per ordinamento */}
                        <th
                            onClick={() => handleSort("status")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Stato {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>

                        {/* Colonna "Data di Creazione", cliccabile per ordinamento */}
                        <th
                            onClick={() => handleSort("createdAt")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* Rende ogni task tramite il componente TaskRow */}
                    {filteredAndSortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>

            </table>

        </div>

    );

}
