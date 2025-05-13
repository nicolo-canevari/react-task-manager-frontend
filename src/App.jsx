import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
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
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );

}

export default App;