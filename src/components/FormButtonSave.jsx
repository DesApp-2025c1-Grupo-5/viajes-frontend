import { Save } from "lucide-react";

const FormButtonSave = ({disabled}) => {
  return (
    <button
    disabled={disabled}
    type="submit"
    className={`
      w-36 rounded-2xl shadow-md px-4 py-3 mt-8  transition-all flex items-center justify-center gap-1
        ${disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 cursor-pointer text-white hover:scale-105"
        }
    `}
    >
      <div className="flex items-center justify-center gap-1">
        <Save/>
        <span>Guardar</span>
      </div>
    </button>
  );
};

export default FormButtonSave;

