import React from 'react';

interface ProductInput {
  the: string[];
  [key: string]: any;
}

interface BubbleTeaTheProps {
  productInput: ProductInput;
  setProductInput: React.Dispatch<React.SetStateAction<ProductInput>>;
}

const BubbleTeaThe: React.FC<BubbleTeaTheProps> = ({ productInput, setProductInput }) => {

  const handleToggleThe = (selectedThe: string) => {
    setProductInput((prevInput: ProductInput) => ({
      ...prevInput,
      the: prevInput.the.includes(selectedThe)
        ? prevInput.the.filter((the) => the !== selectedThe)
        : [...prevInput.the, selectedThe],
    }));
  };

  return (
    <div>
      <h1>Thé ou Latté</h1>
      <div className='flex flex-wrap gap-2 mb-4 bg-green-800 p-4 rounded-lg'>
        {["Thé vert", "Thé noir", "Thé vert latté", "Thé noir latté"].map((the) => (
          <button
            key={the}
            onClick={() => handleToggleThe(the)}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              productInput.the && productInput.the.includes(the) 
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {the}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BubbleTeaThe;