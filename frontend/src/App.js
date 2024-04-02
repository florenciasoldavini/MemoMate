import './App.css';
import { Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";

import Login from "./scenes/Login";
import Notes from "./scenes/Notes";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Deleted from './scenes/Deleted';
import Archived from './scenes/Archived';

axios.defaults.baseURL = "http://localhost:3001/"

function App() {
const location = useLocation();
const isHome = location.pathname === '/notes' || location.pathname === '/deleted' || location.pathname === '/archived';
  
  return (
    <div>
      <Topbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="container-home">
        {isHome && <Sidebar />}
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
