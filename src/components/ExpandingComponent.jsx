import React, { useState } from "react";
import PropTypes from "prop-types";

const ExpandingComponent = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black">
      <div
        onClick={toggleOpen}
        className={`flex justify-between items-center w-15 px-3.5 py-2.5  bg-green-600 text-white rounded-full transition-all duration-300 ${
          isOpen ? "rounded-b-none p-6" : ""
        }`}
      >
        <span className="flex text-xl font-bold">{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ➔
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-auto" : "max-h-0"
        }`}
      >
        <div className="p-2 bg-black rounded-b-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
          {React.Children.map(children, (child) => (
            <button className="w-lg p-2 h-12 bg-green-600 text-white rounded-lg transition-all duration-300">
              {child}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

ExpandingComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExpandingComponent;
