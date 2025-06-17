import { Save } from "lucide-react";

const FormButtonSave = () => {
  return (
    <button
      type="submit"
      className="w-36 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-md px-4 py-3 mt-8 cursor-pointer hover:scale-105 transition-all"
    >
      <div className="flex items-center justify-center gap-1">
        <Save/>
        <span>Guardar</span>
      </div>
    </button>
  );
};

export default FormButtonSave;

