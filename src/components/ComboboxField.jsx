import { useState, useEffect, useRef } from "react";
import { Combobox } from "@headlessui/react";


const ComboboxField = ({ label, value, placeholder, onChange, options }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const comboboxRef = useRef(null);

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-500">
          {label}:
        </label>
      )}
      <Combobox value={value} onChange={onChange}>
        <div className="relative" ref={comboboxRef}>
          <Combobox.Input
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full cursor-pointer"
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setQuery("");
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            displayValue={(val) => val}
          />
          {(isOpen && filtered.length > 0) && (
            <Combobox.Options 
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg border border-gray-200"
              static
            >
              {filtered.map((item, index) => (
                <Combobox.Option
                  key={index}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-400 text-white" : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default ComboboxField;