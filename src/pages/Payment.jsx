import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const URL_BASE = import.meta.env.VITE_API_URL;

function Payment({ total }) {  // Accepter la prop total ici
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    // Créez le PaymentIntent dès que le total change
    if (total) {
      const amount = Math.round(total * 100); // Convertir le total en centimes
      axios
        .post(`${URL_BASE}/create-payment-intent`, { amount: amount}) 
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error("Erreur lors de la création du PaymentIntent:", error);
        });
    }
  }, [total]); // Dépendre du total

  return (console.log("total", total),
    <div className="flex flex-col h-screen items-center">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm total={total} /> {/* Passer le total à CheckoutForm */}
        </Elements>
      )}
    </div>
  );
}

export default Payment;