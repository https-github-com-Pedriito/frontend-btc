// components/GDPRPopup.js
import { useEffect, useState } from "react";

const GDPRPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur a déjà accepté les cookies
    const hasAcceptedCookies = localStorage.getItem("acceptedCookies");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Enregistrer l'acceptation des cookies dans localStorage
    localStorage.setItem("acceptedCookies", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Optionnel : vous pouvez gérer le refus ici
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg rounded-t-lg z-50">
        <p className="mb-2 md:mb-0 md:mr-4">
          Nous utilisons des cookies pour améliorer votre expérience. En
          continuant à utiliser notre site, vous acceptez notre politique de
          confidentialité.
        </p>
        <div className="flex">
          <button
            onClick={handleAccept}
            className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition duration-200 mr-2"
          >
            Accepter
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition duration-200"
          >
            Refuser
          </button>
        </div>
      </div>
    )
  );
};

export default GDPRPopup;