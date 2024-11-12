import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Basket = ({ total }) => {
  const { cart, removeFromCart, setCart } = useCart();
  const [basketTotal, setBasketTotal] = useState(0); // Renommer ici

  // Calculer le total à chaque fois que le panier change
  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setBasketTotal(newTotal); // Mettre à jour le nouvel état
  }, [cart]);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === id);
      if (product) {
        const newQuantity = product.quantity + delta;
        if (newQuantity > 0) {
          return prevCart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
        } else {
          return prevCart.filter((item) => item.id !== id);
        }
      }
      return prevCart; // Retourne le panier inchangé si le produit n'est pas trouvé
    });
  };

  return (
    console.log("cart:", cart),
    (
      <div className="max-w-6xl mx-auto bg-black text-white rounded-lg shadow-lg p-6">
        <Link to={"/"}>
          <ChevronLeft className="justify-start size-10" />
        </Link>
        <h2 className="text-3xl mb-20 mt-8 font-bold">Panier</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {cart.length === 0 ? (
              <p className="text-white">Votre panier est vide.</p>
            ) : (
              cart.map(
                (item) => (
                  console.log("item:", item),
                  (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4 border-b border-gray-200 "
                    >
                      {/* Détails de chaque produit dans le panier */}
                      <div className="flex flex-col md:flex-row bg-white/10 p-4 rounded-lg mb-4 mt-6 w-74">
                        <img
                          className="w-full md:w-32 h-auto rounded-lg mb-4 md:mb-0 object-cover"
                          src={item.imageSrc}
                          alt="Image du Produit"
                        />
                        <div className="ml-0 flex flex-col md:ml-4">
                          <p className="font-semibold text-center md:text-left">
                            {item.title}
                          </p>
                          {item.selectedOptions &&
                            item.selectedOptions.length > 0 && (
                              <>
                                <p className="mt-2">Options</p>
                                <span className="rounded-full bg-white/10 p-2 mt-2 mb-2">
                                  {item.selectedOptions.join(", ")}
                                </span>
                              </>
                            )}
                           {/* Affichage pour Bubble Tea */}
                           {item.selectedThe && item.selectedThe.length > 0 && (
                            <>
                              <p className="mt-2">Thé</p>
                              <span className="rounded-full bg-green-400/80 p-2 mt-2 mb-2">
                                {item.selectedThe.join(", ")}
                              </span>
                            </>
                          )}
                          {item.selectedPerles && item.selectedPerles.length > 0 && (
                            <>
                              <p className="mt-2">Perles</p>
                              <span className="rounded-full bg-green-400/80 p-2 mt-2 mb-2">
                                {item.selectedPerles.join(", ")}
                              </span>
                            </>
                          )} 
                          {item.selectedParfums && item.selectedParfums.length > 0 && (
                            <>
                              <p className="mt-2">Parfum</p>
                              <span className="rounded-full bg-green-400/80 p-2 mt-2 mb-2">
                                {item.selectedParfums.join(", ")}
                              </span>
                            </>
                          )}
                          <p className="text-gray-600 text-center mb-2 md:text-left">
                            Prix: {item.price} € x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)} // Soustraire 1 à la quantité
                          className="bg-gray-200 hover:bg-red-500 text-gray-800 rounded px-2 py-1"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, +1)} // Ajouter 1 à la quantité
                          className="bg-gray-200 hover:bg-green-400 text-gray-800 rounded px-2 py-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="hidden md:block ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="block md:hidden ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                        >
                          {/* Icône de suppression pour les écrans plus petits */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                )
              )
            )}

            <div className="flex justify-between items-center mt-6 text-lg font-semibold">
              <span>Total :</span>
              <span>{basketTotal.toFixed(2)} €</span>{" "}
              {/* Affichage du total ici */}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Basket;
