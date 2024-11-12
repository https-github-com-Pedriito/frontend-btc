import logo from "../assets/logo.png";
import { Link as RouterLink } from "react-router-dom"; // Pour la navigation entre pages
import { House, ShoppingBag, ForkKnife } from "lucide-react";
import { Badge } from "@mui/material";
import { useCart } from "./CartContext";
const Navbar = () => {
  const { cart } = useCart();
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {/* Navbar */}
      <div className="bg-black text-white p-2 z-10">
        <div
          id="navbar-bg"
          className="mx-auto my-2 h-24 flex justify-between items-center rounded-full bg-white/25  px-4 md:px-10"
        >
          <div className="flex items-center cursor-pointer">
            <div className="hidden md:block w-10 h-auto">
              <img src={logo} alt="logo du restaurant" />
            </div>
            <h1 className="hidden md:block ml-2 text-lg text-greenspecial uppercase">
              Bo Tai <span className="text-white">Chanh</span>
            </h1>
          </div>

          {/* Menu de navigation */}
          <nav className="flex-grow flex items-center justify-between md:justify-end  text-sm md:text-lg font-medium pr-16 pl-16 md:gap-8">
            {/* Bouton Accueil */}
            <RouterLink to="/" className="flex flex-col items-center">
              <House />
              <p className="hidden md:block">Accueil</p>
            </RouterLink>

            {/* Bouton Menu */}
            <RouterLink to="/PageMenu" className="flex flex-col items-center">
              <ForkKnife />
              <p className="hidden md:block">Menu</p>
            </RouterLink>

            <RouterLink to="/BasketPage">
              <Badge badgeContent={cart.length} color="error" className="flex flex-col items-center">
                <ShoppingBag />
                <p className="hidden md:block">Panier</p>
              </Badge>
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
