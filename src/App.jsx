import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import './index.css'

export default function App() {

  return (
    // BrowserRouter avvolge tutta l'app e abilita il routing
    <BrowserRouter>
      {/* Navbar visibile in tutte le pagine */}
      <Navbar />
      {/* Definizione delle rotte */}
      <Routes>
        {/* Rotta per la lista dei task (pagina principale) */}
        <Route path="/" element={<TaskList />} />
        {/* Rotta per la pagina di aggiunta task */}
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );

}
