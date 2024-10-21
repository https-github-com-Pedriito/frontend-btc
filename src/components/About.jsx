import resto from "../assets/resto.jpg";
import {useNavigate} from 'react-router-dom'
const About = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/Pagemenu')
  }
  return (
    <div className="p-8 bg-black">
      {/* Contenu adaptatif pour mobile */}
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-28 mt-10 space-y-8 md:space-y-0">
        {/* Image en haut sur mobile */}
        <div className="md:w-2/5 w-full">
          <img
            src={resto}
            alt="photo du restaurant"
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </div>

        {/* Texte centré */}
        <div className="md:w-2/5 w-full flex flex-col justify-center items-center text-center">
          <p className="text-white text-lg">
            Bienvenue chez Shasha Thai Grill, où l’authenticité thaïlandaise
            rencontre des ingrédients frais et locaux. Découvrez des plats
            mémorables préparés avec passion, du curry parfumé aux grillades
            exquises.Embarquez pour un voyage culinaire qui éveillera vos sens
            et vous transportera au cœur de Bangkok.
          </p>
        </div>
      </div>

      {/* Bouton centré en dessous */}
      <div className="flex justify-center mt-12 mb-8">
        <button onClick={handleClick} 
        className=" bg-green-600 text-white rounded-full shadow-neumorphic px-8 py-5  hover: cursor-pointer transition-transform transform active:shadow-neumorphic-inset active:translate-y-2 ">
          Découvrir le Menu
        </button>
      </div>
    </div>
  );
};

export default About;
