import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";

export default function TaskList() {

    // Estrae la lista dei task dallo stato globale
    const { tasks } = useContext(GlobalContext);

    return (
        <div>
            <h1>Lista dei Task</h1>
            {/* Tabella per visualizzare i task */}
            <table>
                <thead>
                    <tr>
                        {/* Intestazioni delle colonne della tabella */}
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Cicla l'elenco dei task e renderizza una riga per ciascuno */}
                    {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />  // Passa ogni oggetto "task" come prop al componente TaskRow
                    ))}
                </tbody>
            </table>
        </div>
    );

}
