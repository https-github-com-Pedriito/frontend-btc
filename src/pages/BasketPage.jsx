import React, { useState, useEffect } from "react";
import Basket from "../components/Basket";
import Payment from "./Payment";
import { useCart } from "../components/CartContext"; // Assurez-vous d'importer le contexte du panier
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
const BasketPage = () => {
  const { cart } = useCart(); // Utilisez le contexte du panier
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculez le total basé sur le panier
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className=" bg-black sm:[flex flex-row p-10 justify-between items-stretch shadow-lg rounded-lg] h-screen">
      <div className=" mb-8 sm:[w-1/2 p-4]">
        <Basket total={total} /> {/* Passez total à Basket */}
      </div>
      <div className=" flex flex-col gap-4 sm:[w-1/2 p-4]">
        <Link 
        // to={"/preOrder"}
        >
          <Button disabled={true}> Pré-commander</Button>
        </Link>
        <Link 
        // to="/orderPage"
        >
          <Button disabled={true} className="text-black bg-white">
            {" "}
            Réserver une table
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
