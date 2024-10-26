import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dev_image from "../assets/dvlp.webp";

const Dev = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour rediriger l'utilisateur après un délai
    const timer = setTimeout(() => {
      navigate(-1); // -1 indique de revenir d'une page
    }, 1500); // 1500 ms = 1.5s

    // Nettoyage du timer si le composant est démonté avant le délai
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <img 
        src={dev_image} 
        alt="image du développeur" 
        className="w-full object-fill" 
      />
    </div>
  );
};

export default Dev;