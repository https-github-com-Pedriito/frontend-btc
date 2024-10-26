import { SlBasketLoaded } from "react-icons/sl";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link as RouterLink } from "react-router-dom"; // Pour la navigation entre pages

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="bg-black text-white p-4 z-10">
        <div className="container mx-auto flex justify-between items-center rounded-full bg-white bg-opacity-15 px-8 py-2 border-solid border-white">
          <div className="flex items-center cursor-pointer">
            <div className="w-24 h-24 mr-2">
              <img src={logo} alt="logo du restaurant" />
            </div>
            <h1 className=" text-3xl text-greenspecial uppercase hidden md:block font-">
              Bo Tai <span className="text-white">Chanh</span>
            </h1>
          </div>

          {/* Menu burger pour mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <FaBars size={28} />
            </button>
          </div>

          {/* Menu de navigation */}
          <nav
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center text-lg font-medium gap-8 absolute md:static top-16 mt-8 mb-8 left-0 right-0 bg-black md:bg-transparent p-4 md:p-0 z-20`}
          >
            {/* Bouton Accueil (router pour retourner à la page principale + défilement vers la section About) */}
            <RouterLink
              to="/"
              className="transition-all cursor-pointer bg-green-700 text-white shadow-neumorphic shadow-gray active:shadow-neumorphicInset rounded-full px-8 py-4"
              onClick={toggleMenu}
            >
              Accueil
            </RouterLink>

            {/* Bouton Menu pour naviguer vers la page du menu */}
            <RouterLink
              to="/PageMenu"
              className="transition-all cursor-pointer bg-green-700 text-white shadow-neumorphic shadow-gray active:shadow-neumorphicInset rounded-full px-8 py-4"
              onClick={toggleMenu}
            >
              Menu
            </RouterLink>

            <RouterLink
              to="/DevPage"
              className="transition-all items-center cursor-pointer bg-red-700 text-white shadow-neumorphic shadow-gray active:shadow-neumorphicInset rounded-full px-8 py-6"
              onClick={toggleMenu}
            >
              <SlBasketLoaded />
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
