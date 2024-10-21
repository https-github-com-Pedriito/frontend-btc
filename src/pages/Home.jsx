import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PreOrderAd from "../components/PreOrderAd";
import RGPDBox from "../components/RGPDBox"; // Importer le composant
import About from "../components/About";
import Menu from "../components/Menu";

const Home = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Vérifiez le consentement stocké dans localStorage
    const consent = localStorage.getItem('gdprConsent');
    if (consent) {
      setHasConsent(true);
    } else {
      setHasConsent(false);
    }
  }, []);

  const handleConsent = (consent) => {
    setHasConsent(consent);
    localStorage.setItem('gdprConsent', consent);
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <About />
        <PreOrderAd />
        <Menu />
      </main>
      <footer>
        <Footer />
      </footer>
      {/* Afficher le modal GDPR uniquement si le consentement n'a pas été donné */}
      {!hasConsent && <RGPDBox onConsent={handleConsent} />}
    </div>
  );
};

export default Home;