import { useState } from "react";
import { Combobox } from "@headlessui/react";


const ComboboxField = ({ label, value, placeholder, onChange, options }) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-500">
          {label}:
        </label>
      )}
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setQuery("")}
            displayValue={(val) => val}
          />
          {filtered.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg">
              {filtered.map((item, index) => (
                <Combobox.Option
                  key={index}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-400 text-white" : "text-gray-900"
                    }`
                  }
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