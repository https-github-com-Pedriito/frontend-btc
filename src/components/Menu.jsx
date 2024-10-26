import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { fetchCategories, fetchProducts, fetchSubCategories } from "../api";

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
const ProductPopup = ({ product, onClose, onAddToCart }) => {
  const popupRef = useRef(null);

  // Détecte le clic à l'extérieur de la popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
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
    (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div
          ref={popupRef}
          className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-4"
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            &times;
          </button>

          <img
            src={product.imageSrc}
            alt={product.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h2 className="text-lg font-bold text-gray-800 text-center">
            {product.title}
          </h2>
          <p className="text-md text-gray-600 mt-1 text-center">
            {product.price} €
          </p>
          <p className="text-gray-700 mt-2 text-center text-sm">
            {product.description}
          </p>

          <div className="mt-3">
            {product.options && product.options.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-800">
                  Options :
                </h3>
                <div className="grid grid-cols-1 gap-1 p-1 rounded-lg transition duration-200 bg-white">
                  {product.options.map((option, index) => (
                    <div
                      key={index}
                      className="bg-green-800 p-1 rounded-lg  text-gray-800 text-center text-sm"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            {product.allergenes && product.allergenes.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-800">
                  Allergènes :
                </h3>
                <div className="grid grid-cols-1 gap-1 px-1 py-1 rounded-lg transition duration-200 bg-white">
                  {product.allergenes.map((allergene, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white p-1 rounded-lg text-gray-800 text-center text-sm"
                    >
                      <span className="mr-1">{allergenesIcons[allergene]}</span>
                      {allergene}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="mt-4 w-lg px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    )
  );
};

ProductPopup.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

// Composant Menu qui affiche une grille de cartes avec une barre d'onglets
const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
            imageSrc: product.imageUrl || "default_image_url.jpg",
            category: subCategory
              ? categoryMap[subCategory.categoryId]
              : "Non Défini",
            subCategory: subCategory ? subCategory.name : "Non Défini",
            description: product.Description, // Correction ici
            options: product.options || [],
            allergenes: product.allergenes || [],
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

  const handleAddToCart = (product) => {
    console.log("Produit ajouté au panier :", product);
  };

  return (
    <div className="p-8 bg-black">
      <div className="flex justify-start space-x-2 p-4 bg-gray-200 gap-20 px-8 rounded-full shadow-lg mb-12 bg-opacity-40 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.Name)}
            className={`px-8 py-5 rounded-full shadow-lg ${
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
              <h2 className="text-xl font-bold text-gray-700 mb-4">
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
                  description={item.description} // Correction ici
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
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Menu;
