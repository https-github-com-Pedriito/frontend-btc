import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
// Pages
import PageMenu from "./pages/Menupage";
import Home from "./pages/Home";
import PreOrderPage from "./pages/PreOrderPage";
import Completion from "./pages/Completion";
import Payment from "./pages/Payment";
import BasketPage from "./pages/BasketPage";
import Reservationpage from "./pages/Reservationpage";
import Dashboard from "./components/Dashboard";
import Dev from "./components/Dev";
import { CartProvider } from "./components/CartContext"; // Import du contexte CartProvider
const URL_BASE = import.meta.env.VITE_API_URL;
console.log("URL_BASE", URL_BASE);
function App() {
  const [ stripePromise, setStripePromise ] = useState(null);

  useEffect(() => {
    fetch(`${URL_BASE}/stripe-key`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Récupérer le corps de la réponse en JSON
      })
      .then((data) => {
        const { publishableKey } = data;
        setStripePromise(loadStripe(publishableKey)); // Initialiser Stripe avec la clé publique
      })
      .catch((error) => {
        console.error('Error fetching Stripe key:', error); // Gérer les erreurs
      });
  }, []);
  return (
    <CartProvider> 
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Pagemenu" element={<PageMenu />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/preOrder" element={<PreOrderPage />} />
            <Route path="/DevPage" element={<Dev />} />
            <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
            <Route path="/BasketPage" element={<BasketPage />} />
            <Route path='/Payment' element={<Payment stripePromise={stripePromise} />} />
            <Route path="/OrderPage" element={<Reservationpage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;