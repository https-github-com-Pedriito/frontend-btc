import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black h-60 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mt-4 md:mb-0">
            <Link to="/" className="hover:underline">
              Accueil
            </Link>
            <Link to="/Dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/PageMenu" className="hover:underline">
              Menu
            </Link>
          </div>
          <div className="flex space-x-6 align-baseline">
            <div>
              <SocialIcon url="https://www.facebook.com/ShashaThaiGrill" />
            </div>
            <SocialIcon url="https://www.instagram.com/shasha_thai_grill/" />
          </div>
        </div>
        <div className="text-center mt-20 mb-0">
          <p>&copy; 2024 Bo Tai Chanh All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;