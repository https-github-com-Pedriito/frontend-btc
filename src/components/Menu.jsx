import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { fetchCategories, fetchProducts, fetchSubCategories } from "../api";
import { useCart } from "./CartContext";
import ProductPopup from "./ProductPopup";
import Card from "./Card";
import { CheckCircle } from "lucide-react";

// Fonction pour charger les images une seule fois et les stocker dans localStorage avec un numéro
const useImageCache = () => {
  const [imageCache, setImageCache] = useState({});
  const [downloadedImages, setDownloadedImages] = useState(0); // Suivre le nombre d'images téléchargées
  const [activeTab, setActiveTab] = useState(""); // Suivre l'onglet actif

  const getImage = useCallback(
    (src) => {
      // Vérifier si l'image est déjà dans le localStorage
      if (imageCache[src]) {
        return imageCache[src]; // Retourner l'image du cache si elle existe déjà
      }

      // Si l'image n'est pas encore dans le cache, vérifier si elle est dans localStorage
      const cachedImage = localStorage.getItem(src);
      if (cachedImage) {
        // Mettre à jour le cache local avec l'image provenant de localStorage
        setImageCache((prevCache) => ({
          ...prevCache,
          [src]: cachedImage,
        }));
        return cachedImage;
      }

      // Si l'image n'est pas dans le cache, on la télécharge
      const img = new Image();
      img.src = src;

      img.onload = () => {
        // Quand l'image est complètement chargée, la mettre dans le cache et dans localStorage
        setImageCache((prevCache) => ({
          ...prevCache,
          [src]: img.src,
        }));
        localStorage.setItem(src, img.src); // Stocker l'image dans localStorage

        // Incrémenter le compteur d'images téléchargées de façon synchrone
        setDownloadedImages((prev) => {
          const newCount = prev + 1;
          // Afficher un message dans la console indiquant que l'image a été téléchargée
          console.log(
            `Image ${newCount} téléchargée depuis l'onglet : ${activeTab} - URL : ${src}`
          );
          return newCount;
        });
      };

      return img.src; // Retourner l'URL de l'image pour l'utiliser dans le composant
    },
    [imageCache, activeTab]
  ); // Utilisation des dépendances

  // Mettre à jour l'onglet actif chaque fois que l'onglet sélectionné change
  const setTab = (tabName) => {
    setActiveTab(tabName);
  };

  return { getImage, setTab };
};

const Menu = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { getImage, setTab } = useImageCache(); // Hook pour récupérer les images et les mettre en cache

  const handleProductAddToCart = useCallback(
    (product) => {
      addToCart(product);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    },
    [addToCart]
  );

  const fetchCategoriesData = useCallback(async () => {
    const data = await fetchCategories();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].Name); // Mettez ici la catégorie par défaut
    }
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const products = await fetchProducts();
        console.log(products);
        const subCategories = await fetchSubCategories();
        const categories = await fetchCategories();

        const categoryMap = Object.fromEntries(
          categories.map((category) => [category.id, category.Name])
        );

        const allMenuItems = products.map((product) => {
          const subCategory =
            subCategories.find((sub) => sub.name === product.subCategoryId) ||
            null;

          return {
            title: product.name,
            price: product.price,
            imageSrc: getImage(product.imageUrl || "default_image_url.jpg"), // Utilisation de la fonction de cache d'image
            category: subCategory
              ? categoryMap[subCategory.categoryId]
              : "Non Défini",
            subCategory: subCategory ? subCategory.name : "Non Défini",
            description: product.Description,
            options: product.options || [],
            allergenes: product.allergenes || [],
            the: product.the || [],
            perle: product.perle || [],
            parfum: product.parfum || [],
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
  }, [selectedCategory, getImage]);

  useEffect(() => {
    const newFilteredItems = menuItems.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredItems(newFilteredItems);
  }, [selectedCategory, menuItems]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.subCategory]) {
        acc[item.subCategory] = [];
      }
      acc[item.subCategory].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-black">
      <div className="w-full max-w-5xl relative">
        {showConfirmation && (
          <div className="fixed flex flex-row items-center justify-center p-4 text-center bg-white rounded-lg text-t z-auto top-10 left-1/2 transform -translate-x-1/2 w-lg">
            <p>Produit ajouté au panier</p>
            <CheckCircle className="text-green-400" />
          </div>
        )}

        <div className="sm:px-8 sm:justify-between flex p-3  mb-12 space-x-4 overflow-x-auto bg-gray-200 rounded-full shadow-lg bg-opacity-40 whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.Name);
                setTab(category.Name); // Définir l'onglet actif chaque fois qu'une catégorie est sélectionnée
              }}
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
                <h2 className="mb-4 font-bold text-gray-700 md:text-xl">
                  {subCategory}
                </h2>
              )}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {groupedItems[subCategory].map((item) => (
                  <Card
                    key={item.id}
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
            addToCart={handleProductAddToCart}
          />
        )}
      </div>
    </div>
  );
};

Menu.propTypes = {};

export default Menu;
