import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import TaskDetail from "./Pages/TaskDetail";
import GlobalProvider from "./Context/GlobalContext";
import './index.css'

// Componente principale dell'app
function App() {

  return (

    // Avvolge tutta l'app nel provider per rendere lo stato globale accessibile ovunque
    <GlobalProvider>

      {/* Configura il router per la navigazione */}
      <BrowserRouter>

        {/* Barra di navigazione visibile in tutte le pagine */}
        <Navbar />

        {/* Definizione delle rotte dell'app */}
        <Routes>

          {/* Rotta per la lista dei task */}
          <Route path="/" element={<TaskList />} />

          {/* Rotta per aggiungere un nuovo task */}
          <Route path="/add" element={<AddTask />} />

          {/* Rotta per il dettaglio del singolo task */}
          <Route path="/task/:id" element={<TaskDetail />} />

          {/* "Catch-all" per gestire rotte non esistenti (404) */}
          <Route path="*" element={<h2>Pagina non trovata</h2>} />

        </Routes>

      </BrowserRouter>

    </GlobalProvider>

  );

}

export default App;