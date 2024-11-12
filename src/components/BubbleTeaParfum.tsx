import React from 'react'

interface ProductInput {
  parfum: string[];
  [key: string]: any;
}

interface BubbleTeaParfumProps {
  productInput: ProductInput;
  setProductInput: React.Dispatch<React.SetStateAction<ProductInput>>;
}

const BubbleTeaParfum: React.FC<BubbleTeaParfumProps> = ({ productInput, setProductInput }) => {

  const handleToggleParfum = (selectedParfum: string) => {
    setProductInput((prevInput: ProductInput) => ({
      ...prevInput,
      parfum: prevInput.parfum.includes(selectedParfum)
        ? prevInput.parfum.filter((parfum) => parfum !== selectedParfum)
        : [...prevInput.parfum, selectedParfum],
    }));
  };

  return (
    <div className='mb-8'>
      <h1>Parfum</h1>
      <div className='flex flex-wrap gap-2 mb-4 bg-green-800 p-4 rounded-lg'>
        {[
          'ananas',
          'litchi',
          'citron',
          'pêche',
          'fruit de la passion',
          "melon",
          "hibiscus",
          'mangue',
          'fraise',
          "rose",
          'pomme',
          "goyave",
          "matcha",
          "taro",
          "thai tea",
        ].map((parfum) => (
          <button
            key={parfum}
            onClick={() => handleToggleParfum(parfum)}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              productInput.parfum && productInput.parfum.includes(parfum) 
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {parfum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BubbleTeaParfum
