import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { fetchCategories, fetchProducts, fetchSubCategories } from "../api";
import { useCart } from "./CartContext";
import { CornerDownLeft } from "lucide-react";
const allergenesIcons = {
  Gluten: "🌾",
  "Fruits de mer": "🦐",
  Oeufs: "🥚",
  Arachides: "🥜",
  Soja: "🌱",
  Laitage: "🥛",
  Poisson: "🐟",
  Sésame: "🌿",
  Moutarde: "🌿",
  Crustacés: "🦀",
  "Fruits à coque": "🌰",
  Sulfites: "🧪",
  Lupin: "🌼",
  Céleri: "🥬",
};
// Composant Card pour afficher une seule carte
const Card = ({ imageSrc, title, price, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
    >
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">
          {price !== null ? `${price} €` : "Prix non disponible"}
        </p>
        {/* Ajout de description en tant que prop */}
        <p className="hidden">{description}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Composant Popup pour afficher les détails du produit
const ProductPopup = ({ product, onClose, addToCart }) => {
  const popupRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedThe, setSelectedThe] = useState([]);
  const [selectedPerles, setSelectedPerles] = useState([]);
  const [selectedParfums, setSelectedParfums] = useState([]);



  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((opt) => opt !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const toggleThe = (selectedThe) => {
    setSelectedThe((prevThe) =>
      prevThe === selectedThe ? [] : [selectedThe] 
    );
  };


  const togglePerle = (selectedPerle) => {
    setSelectedPerles((prevPerles) =>
      prevPerles === selectedPerle ? [] : [selectedPerle]
    );
  };

  const toggleParfum = (selectedParfum) => {
    setSelectedParfums((prevParfums) =>
      prevParfums === selectedParfum ? [] : [selectedParfum]
    );
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!product) return null;

  return (
    console.log(product),
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
  <div
    ref={popupRef}
    className="relative bg-white rounded-lg shadow-lg w-3/4 p-8 h-5/6 overflow-y-auto sm:h-4/6"
  >
    <button
      onClick={onClose}
      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
    ></button>

    <h2 className="text-2xl mb-2 sm:[text-2xl font-bold text-center text-gray-800 mb-4]">
      {product.title}
    </h2>

    <div className="flex flex-col sm:flex-row sm:space-x-6 items-center">
      {/* Image à gauche */}
      <div className="flex-shrink-0 sm:w-1/2">
        <img
          src={product.imageSrc}
          alt={product.title}
          className="w-3/4 h-auto object-cover mb-2 rounded-sm"
        />
      </div>

      {/* Informations à droite */}
      <div className="flex flex-col space-y-4 items-center sm:w-1/2">
        <p className="text-sm text-gray-600">{product.description}</p>

        {product.options && product.options.length > 0 && (
          <div className="mb-2">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Options :</h3>
            <div className="flex flex-wrap gap-2">
              {product.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => toggleOption(option)}
                  className={`flex items-center text-sm rounded-full px-3 py-1 transition-all ${
                    selectedOptions.includes(option)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.allergenes && product.allergenes.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Allergènes :</h3>
            <div className="flex flex-wrap gap-2">
              {product.allergenes.map((allergene, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-800 text-sm bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="mr-1">{allergenesIcons[allergene]}</span>
                  {allergene}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.the && product.the.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Thé :</h3>
            <div className="flex flex-wrap gap-2">
              {product.the.map((the, index) => (
                <div
                  key={index}
                  onClick={() => toggleThe(the)}
                  className={`flex items-center text-sm rounded-full px-3 py-1 transition-all ${
                    selectedThe.includes(the)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {the}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.perle && product.perle.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Perle :</h3>
            <div className="flex flex-wrap gap-2">
              {product.perle.map((perle, index) => (
                <div
                
                  key={index}
                  onClick={() => togglePerle(perle)} 
                  className={`flex items-center text-sm rounded-full hover: cursor-pointer px-3 py-1 transition-all ${
                    selectedPerles.includes(perle)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {perle}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.parfum && product.parfum.length > 0 && (
          <div>
            
            <h3 className="text-md font-semibold text-gray-800 mb-2">Parfum :</h3>
            <div className="flex flex-wrap gap-2">
              {product.parfum.map((parfum, index) => (
                <div
                  key={index}
                  onClick={() => toggleParfum(parfum)}
                  className={`flex items-center text-sm rounded-full px-3 py-1 transition-all ${
                    selectedParfums.includes(parfum)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {parfum}
                </div>
              ))}
            </div>
          </div>
        )}


        <p className="flex flex-col  text-gray-700 text-2xl font-semibold">
          {product.price} €
        </p>
      </div>
    </div>

    <div className="mt-4 flex justify-center">
      <button
        onClick={() => {
          const { parfum, perle, the, ...productWithoutExcludedProps } = product;
          addToCart({ ...productWithoutExcludedProps, selectedParfums, selectedPerles, selectedThe });
          console.log("Produit ajouté au panier: ", {...productWithoutExcludedProps, selectedParfums, selectedPerles, selectedThe });
          onClose();
        }}
        className="px-6 py-3 bg-green-500 text-white mt-auto rounded-lg text-lg font-semibold"
      >
        Ajouter au panier
      </button>
    </div>
  </div>
</div>
  );
};

ProductPopup.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

// Composant Menu qui affiche une grille de cartes avec une barre d'onglets
const Menu = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleProductAddToCart = (product) => {
    addToCart(product);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const fetchCategoriesData = async () => {
    const data = await fetchCategories();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[1].Name);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const products = await fetchProducts();
        const subCategories = await fetchSubCategories();
        const categories = await fetchCategories();

        const categoryMap = Object.fromEntries(
          categories.map((category) => [category.id, category.Name])
        );

        const allMenuItems = products.map((product) => {
          let subCategory = null;
          for (const sub of subCategories) {
            if (sub.name === product.subCategoryId) {
              subCategory = sub;
              break;
            }
          }

          return {
            title: product.name,
            price: product.price,
            the: product.the,
            perle: product.perle,
            parfum: product.parfum,
            imageSrc: product.imageUrl || "default_image_url.jpg",
            category: subCategory
              ? categoryMap[subCategory.categoryId]
              : "Non Défini",
            subCategory: subCategory ? subCategory.name : "Non Défini",
            description: product.Description, // Correction ici
            options: product.options || [],
            allergenes: product.allergenes || [],
            quantity: 1,
            id: product.id,
          };
        });

        setMenuItems(allMenuItems);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des items de menu :",
          error
        );
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  useEffect(() => {
    const newFilteredItems = menuItems.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredItems(newFilteredItems);
  }, [selectedCategory, menuItems]);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subCategory]) {
      acc[item.subCategory] = [];
    }
    acc[item.subCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-black">
      {showConfirmation && (
        <div className="fixed inset-x-0 top-0 z-50 bg-green-500 text-white text-center p-2">
          Produit ajouté au panier
        </div>
      )}
      <div className="flex space-x-2 p-4 bg-gray-200 gap-20 px-8 rounded-full shadow-lg mb-12 bg-opacity-40 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.Name)}
            className={`rounded-full px-3.5 py-2.5 ${
              selectedCategory === category.Name
                ? "bg-green-500 text-white uppercase"
                : "bg-whitespecial text-gray-800 uppercase"
            }`}
          >
            {category.Name}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-8">
        {Object.keys(groupedItems).map((subCategory) => (
          <div key={subCategory}>
            {subCategory && (
              <h2 className=" md:text-xl font-bold text-gray-700 mb-4">
                {subCategory}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedItems[subCategory].map((item, index) => (
                <Card
                  key={index}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  onClick={() => setSelectedProduct(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={handleProductAddToCart} // Pass the function here
        />
      )}
    </div>
  );
};

Menu.propTypes = {};

export default Menu;
