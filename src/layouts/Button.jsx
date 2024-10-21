
const Button = (icon) => {
  return (
    <div>
        <button className="px-6 py-1 border-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full">
          {icon}
        </button>
    </div>
  );
};


export default Button; 