import "./App.css";
import PageMenu from "./pages/Menupage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PreOrderPage from "./pages/PreOrderPage";
import ReservationPage from "./pages/Reservationpage";
import Dev from "./components/Dev";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pagemenu" element={<PageMenu />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/preOrder" element={<PreOrderPage />} />
          <Route path="ReservationPage" element ={<ReservationPage />} />
          <Route path="DevPage" element={<Dev />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
