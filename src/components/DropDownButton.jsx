const DropdownButton = ({
  titulo,
  onChange,
  className,
  required,
  options,
  value,
  disabled,
}) => {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-700">
        {titulo}
        {required && <span className="text-red-500 font-bold"> *</span>}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full bg-white border-1 border-gray-300 shadow-lg font-medium rounded-full text-sm px-5 py-2.5 pr-10 appearance-none
            ${disabled ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300"}
            ${className || ""}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {}
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropdownButton;
