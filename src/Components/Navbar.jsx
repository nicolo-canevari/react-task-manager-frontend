import { NavLink } from "react-router-dom";

// Componente funzionale Navbar
export default function Navbar() {
    return (

        <nav>
            {/* Link verso la home ("/") che mostra la lista dei task */}
            <NavLink to="/">Lista Task</NavLink> |{" "}

            {/* Link verso la pagina di aggiunta di un nuovo task */}
            <NavLink to="/add">Aggiungi Task</NavLink>
        </nav>
    );
}
