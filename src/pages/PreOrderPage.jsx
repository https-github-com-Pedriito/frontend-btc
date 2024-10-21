import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import { FaCalendarCheck } from 'react-icons/fa';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

const PreOrderPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [icsFileUrl, setIcsFileUrl] = useState(null);

  useEffect(() => {
    const price = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(price);
  }, [cart]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerInfo,
      cart,
      selectedTime,
      totalPrice,
      orderTime: new Date().toISOString(),
    };

    // Choix du paiement en ligne via Stripe
    if (paymentMethod === 'online') {
      const stripe = await stripePromise;

      // Appel à votre backend pour créer une session de paiement
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          customerInfo,
          selectedTime,
          totalPrice,
        }),
      });

      const session = await response.json();

      // Rediriger vers la session de paiement Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } else {
      // Traitement pour le paiement au comptoir
      alert('Paiement au comptoir sélectionné');
    }
  };

  const generateICS = (orderData) => {
    const { firstName, lastName } = orderData.customerInfo;
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Commande précommandée
DESCRIPTION:Merci ${firstName} ${lastName} pour votre commande !\nProduits: ${cart
      .map((item) => item.name)
      .join(', ')}\nPrix total: ${totalPrice}€
DTSTART:${selectedTime}
DTEND:${selectedTime}
END:VEVENT
END:VCALENDAR
    `;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mt-10 text-center text-3xl text-white font-bold leading-9 tracking-tight">
          Précommandez vos produits
        </h2>

        {/* Formulaire de précommande */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Prénom"
              value={customerInfo.firstName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, firstName: e.target.value })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={customerInfo.lastName}
              placeholder="Nom"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, lastName: e.target.value })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Sélection du paiement */}
          <div className="mb-4">
            
            <label className="text-white">
              <input
                type="radio"
                name="payment"
                value="counter"
                onChange={() => setPaymentMethod('counter')}
              />{' '}
              Paiement au comptoir
            </label>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Valider ma commande
          </button>
        </form>

        {icsFileUrl && (
          <a
            href={icsFileUrl}
            download="preorder.ics"
            className="mt-4 flex items-center justify-center bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            <p className="mr-2">Ajouter au calendrier</p>
            <p>
              <FaCalendarCheck />
            </p>
          </a>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PreOrderPage;