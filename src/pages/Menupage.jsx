import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

// Composant Card pour afficher une seule carte
// Composant Menu qui affiche une grille de cartes avec une barre d'onglets
const PageMenu = () => {
  // Group items by subCategory
  return (
    <div className="p-8 bg-black">
      <Navbar />
      <main>
        <Menu />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PageMenu;
