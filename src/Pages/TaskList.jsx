import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function TaskList() {

    // Estrae la lista dei task dallo stato globale
    const { tasks } = useContext(GlobalContext);

    return (
        <div>
            <h1>Lista dei Task</h1>

            {/* Elenco dei task */}
            <ul>
                {/* Mappa ogni task ricevuto dal contesto e lo mostra come <li> */}
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
