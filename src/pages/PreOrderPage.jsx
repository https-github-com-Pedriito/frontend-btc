import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import ScheduleSelect from "../components/ScheduleSelect";
import Basket from "../components/Basket";
import { Navigate } from "react-router-dom";

function PreOrderPage() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    paymentMethod: "online",
    location: "inside",
  });

  useEffect(() => {}, [cart]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.location||
      !formData.timeSlot
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    console.log("Commande validée", {
      ...formData,
      timeSlot: formData.timeSlot,
      cart,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Basket />

        <h2 className="text-xl font-semibold mb-4 mt-8">Informations Client</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
          <ScheduleSelect
            value={formData.timeSlot}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, timeSlot: value }))
            }
          />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nom"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Prénom"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Téléphone"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <div className="flex flex-col items-center gap-4">
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="online"> Paiment en ligne</option>
              <option value="counter">Paiement au comptoir</option>
            </select>

            <select
              name="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"

            >
              <option value="inside">Manger sur place</option>
              <option value="outside">À emporter</option>
            
            </select>
          </div>

          <button
            disabled={true}
            type="submit"
            className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-2 rounded-md font-semibold"
          >
            Valider la commande
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreOrderPage;
