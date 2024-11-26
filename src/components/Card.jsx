import React, { useState } from "react";

const Card = ({ imageSrc, title, price, description, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Suivi du chargement de l'image
  const [isImageError, setIsImageError] = useState(false); // Suivi d'une erreur de chargement de l'image

  const handleImageLoad = () => {
    setIsImageLoaded(true); // L'image a été chargée
  };

  const handleImageError = () => {
    setIsImageError(true); // Si l'image échoue à se charger
  };

  return (
    <div
      onClick={onClick}
      className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
    >
      {/* Carte sans image au début avec un placeholder */}
      <div className="relative w-full h-48 bg-gray-200">
        {/* Utilisation d'un placeholder ou d'une couleur de fond par défaut */}
        {!isImageLoaded && !isImageError && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Chargement...
          </div>
        )}
        {/* L'image réelle sera affichée une fois qu'elle est chargée */}
        <img
          src={imageSrc}
          alt={title}
          className={`object-cover w-full h-full transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">
          {price !== null ? `${price} €` : "Prix non disponible"}
        </p>
      </div>
    </div>
  );
};

export default Card;