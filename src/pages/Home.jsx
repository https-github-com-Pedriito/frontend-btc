import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PreOrderAd from "../components/PreOrderAd";
import RGPDBox from "../components/RGPDBox"; // Importer le composant
import About from "../components/About";
import Menu from "../components/Menu";
import ExpandingComponent from "../components/ExpandingComponent";

const allergenesIcons = {
  "Gluten": "🌾",
  "Fruits de mer": "🦐",
  "Oeufs": "🥚",
  "Arachides": "🥜",
  "Soja": "🌱",
  "Laitage": "🥛",
  "Poisson": "🐟",
  "Sésame": "🌿",
  "Moutarde": "🌿",
  "Crustacés": "🦀",
  "Fruits à coque": "🌰",
  "Sulfites": "🧪",
  "Lupin": "🌼",
  "Céleri": "🥬",
};

const Home = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Vérifiez le consentement stocké dans localStorage
    const consent = localStorage.getItem("gdprConsent");
    if (consent) {
      setHasConsent(true);
    } else {
      setHasConsent(false);
    }
  }, []);

  const handleConsent = (consent) => {
    setHasConsent(consent);
    localStorage.setItem("gdprConsent", consent);
  };

  const allergenes = [
    "Gluten",
    "Fruits de mer",
    "Oeufs",
    "Arachides",
    "Soja",
    "Laitage",
    "Poisson",
    "Sésame",
    "Moutarde",
    "Crustacés",
    "Fruits à coque",
    "Sulfites",
    "Lupin",
    "Céleri",
  ];
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <About />
        <PreOrderAd />
        <div className="flex justify-center bg-black">
          <ExpandingComponent title="Allergènes">
            {allergenes.map((allergene, index) => (
              <div key={index}>
                <span className="mr-2">{allergenesIcons[allergene]}</span>
                {allergene}
              </div>
            ))}
          </ExpandingComponent>
        </div>
        <Menu />
      </main>
      <footer>
        <Footer />
      </footer>
      {!hasConsent && <RGPDBox onConsent={handleConsent} />}
    </div>
  );
};

export default Home;
