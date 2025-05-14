import React from "react";
import { Link } from "react-router-dom";

// Componente che rappresenta una singola riga della tabella dei task
function TaskRow({ task }) {
    return (
        <tr>
            {/* Colonna Nome con Link al dettaglio */}
            <td>
                <Link to={`/task/${task.id}`} className="task-link">
                    {task.title}
                </Link>
            </td>

            {/* Colonna Stato */}
            <td className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>
                {task.status}
            </td>

            {/* Colonna: Data di creazione */}
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

// Evita il re-render se le props non cambiano
export default React.memo(TaskRow);
