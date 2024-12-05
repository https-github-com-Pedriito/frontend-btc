import React , { useRef, useState, useEffect }from 'react'
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
      setSelectedThe((prevThe) => (prevThe === selectedThe ? [] : [selectedThe]));
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
      console.log(product.selectedThe),
      (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
    <div
    ref={popupRef}
    className="flex flex-col relative w-3/4 p-8 bg-white rounded-lg shadow-lg h-[90vh] sm:h-[80vh] overflow-y-scroll sm:overflow-hidden"
    >
    <button
      onClick={onClose}
      className="absolute flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full top-2 right-2"
    >
      ×
    </button>

    <h2 className="text-2xl mb-2 sm:text-2xl font-bold text-center text-gray-800">
      {product.title}
    </h2>

    <div className="flex flex-col items-center sm:flex-row sm:space-x-6">
      {/* Image */}
      <div className="flex-shrink-0 sm:w-1/2">
      <img
        src={product.imageSrc}
        alt={product.title}
        className="object-cover w-3/4 h-auto mb-2 rounded-sm"
        loading="lazy"
      />
      </div>

      {/* Contenu */}
      <div className="flex flex-col items-center space-y-4 sm:w-1/2">
      <p className="text-sm text-gray-600">{product.description}</p>

      {product.options && product.options.length > 0 && (
        <div className="mb-2">
        <h3 className="mb-2 font-semibold text-gray-800 text-md">
          Options :
        </h3>
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
            <h3 className="mb-2 font-semibold text-gray-800 text-md">
              Allergènes :
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.allergenes.map((allergene, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
              >
                <span className="mr-1">
                {allergenesIcons[allergene]}
                </span>
                {allergene}
              </div>
              ))}
            </div>
            </div>
          )}
    
          {product.the && product.the.length > 0 && (
            <div>
            <h3 className="mb-2 font-semibold text-gray-800 text-md">
              Thé :
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.the.map((the, index) => (
              <div
                key={index}
                onClick={() => toggleThe(the)}
                className={`flex items-center text-sm rounded-full hover: cursor-pointer px-3 py-1 transition-all ${
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
            <h3 className="mb-2 font-semibold text-gray-800 text-md">
              Perle :
            </h3>
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
            <h3 className="mb-2 font-semibold text-gray-800 text-md">
              Parfum :
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.parfum.map((parfum, index) => (
              <div
                key={index}
                onClick={() => toggleParfum(parfum)}
                className={`flex items-center text-sm rounded-full hover: cursor-pointer px-3 py-1 transition-all ${
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

      <p className="flex flex-col text-2xl font-semibold text-gray-700">
        {product.price} €
      </p>
      </div>
    </div>

    <div className="flex justify-center mt-4 my-auto">
      <button
      onClick={() => {
        const { parfum, perle, the, ...productWithoutExcludedProps } = product;
        addToCart({
        ...productWithoutExcludedProps,
        selectedParfums,
        selectedPerles,
        selectedThe,
        });
        onClose();
      }}
      className="px-6 py-3 mt-auto text-lg font-semibold text-white bg-green-500 rounded-lg"
      >
      Ajouter au panier
      </button>
    </div>
    </div>
  </div>
      )
    );
  };

export default ProductPopup