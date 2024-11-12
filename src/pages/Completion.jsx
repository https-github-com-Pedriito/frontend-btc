import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
function Completion(props) {
  const [messageBody, setMessageBody] = useState("");
  const { stripePromise } = props;
  const { clearCart } = useCart();

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{" "}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
    // Replace this div with the completion message
    clearCart() ,
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
      <p className="text-lg font-semibold mb-4">
        Merci d'avoir commandé chez nous !
      </p>
      <p className="text-gray-700 mb-4">
        Nous espérons que vous apprécierez votre repas.
      </p>
      <div className="text-left">
        <p className="text-gray-600">{messageBody}</p>
      </div>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}

export default Completion;
