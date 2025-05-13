import React from "react";

// Componente che rappresenta una singola riga della tabella dei task
function TaskRow({ task }) {

    return (

        <tr>
            {/* Colonna Nome */}
            <td>{task.title}</td>

            {/* Colonna Stato */}
            <td className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>
                {task.status}
            </td>

            {/* Colonna: Data di creazione */}
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>

    );

}

// React.memo evita il re-render se le props non cambiano
export default React.memo(TaskRow);