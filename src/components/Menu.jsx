import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchCategories, fetchProducts, fetchSubCategories } from "../api";

// Composant Card pour afficher une seule carte
const Card = ({ imageSrc, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">
          {price !== null ? `${price} €` : "Prix non disponible"}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

// Composant Menu qui affiche une grille de cartes avec une barre d'onglets
const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fonction pour récupérer les catégories
  const fetchCategoriesData = async () => {
    const data = await fetchCategories();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].Name); // Sélectionne la première catégorie par défaut
    }
  };

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // Fetch products and subcategories on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const products = await fetchProducts();
        const subCategories = await fetchSubCategories();
        const categories = await fetchCategories();
    
        // Création d'un mapping de categoryId à category Name
        const categoryMap = Object.fromEntries(
          categories.map((category) => [category.id, category.Name])
        );
        
        // Mettre à jour les items du menu après la récupération
        const allMenuItems = products.map((product) => {
          // Trouver la sous-catégorie en utilisant le nom
          let subCategory = null;
          for (const sub of subCategories) {
            if (sub.name === product.subCategoryId) {
              subCategory = sub;
              break; // Sortir de la boucle une fois trouvé
            }
          }
    
          const menuItem = {
            title: product.name,
            price: product.price,
            imageSrc: product.imageUrl || "default_image_url.jpg",
            category: subCategory
              ? categoryMap[subCategory.categoryId]
              : "Non Défini", // Vérifiez si categoryId est bien récupéré
            subCategory: subCategory ? subCategory.name : "Non Défini",
          };
    
          return menuItem;
        });
    
        // Mettez à jour l'état menuItems
        setMenuItems(allMenuItems); // Ajout de cette ligne
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des items de menu :",
          error
        );
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  // Met à jour les éléments filtrés lorsque la catégorie sélectionnée change
  useEffect(() => {
    const newFilteredItems = menuItems.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredItems(newFilteredItems);
  
    // Ajout du console.log ici pour afficher le nombre d'objets et leurs noms
    console.log(`Nombre d'objets à afficher : ${newFilteredItems.length}`);
    console.log("Objets filtrés :", newFilteredItems); // Ajout d'un log pour voir les éléments filtrés
  }, [selectedCategory, menuItems]);

  // Groupement des éléments par sous-catégorie
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subCategory]) {
      acc[item.subCategory] = [];
    }
    acc[item.subCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-black">
      {/* Barre d'onglets */}
      <div className="flex justify-start space-x-2 p-4 bg-gray-200 gap-20 px-8 rounded-full shadow-lg mb-12 bg-opacity-40 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.Name); // Met à jour la catégorie sélectionnée
            }}
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

      {/* Grille de cartes */}
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
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
