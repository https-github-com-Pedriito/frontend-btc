import React, { useState } from 'react'

interface ProductInput {
  perle: string[];
  [key: string]: any;
}

interface BubbleTeaPerleProps {
  productInput: ProductInput;
  setProductInput: React.Dispatch<React.SetStateAction<ProductInput>>;
}

const BubbleTeaPerle: React.FC<BubbleTeaPerleProps> = ({ productInput, setProductInput }) => {

  const handleTogglePerle = (selectedPerle: string) => {
    setProductInput(prevInput => ({
      ...prevInput,
      perle: prevInput.perle.includes(selectedPerle)
        ? prevInput.perle.filter(perle => perle !== selectedPerle)
        : [...prevInput.perle, selectedPerle]
    }))
  }

  return (
    <div>
      <h1>Perle</h1>
      <div className='flex flex-wrap gap-2 mb-4 bg-green-800 p-4 rounded-lg'>
        {[
          'ananas',
          'litchi',
          'citron',
          'pêche',
          'fruit de la passion',
          'mangue',
          'fraise',
          'pomme',
          'myrtille',
          'jelly mix',
          'cerise',
          'grenade'
        ].map(perle => (
          <button
            key={perle}
            onClick={() => handleTogglePerle(perle)}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              productInput.perle && productInput.perle.includes(perle) 
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {perle}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BubbleTeaPerle
