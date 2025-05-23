const DropdownButton = ({ titulo, buttonText, onClick, className }) => {
  return (
    <div>
      {}
      <span className="block mb-2 mt-8 text-sm font-medium text-gray-700">
        {titulo}
      </span>
      {}
      <button
        type="button"
        onClick={onClick}
        className={`
          max-w-full
          w-sm
          text-white
          bg-blue-700 hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium rounded-full
          text-sm px-5 py-2.5
          inline-flex items-center justify-center
          ${className || ""}
        `}
      >
        {buttonText || "Seleccionar"}
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default DropdownButton;
