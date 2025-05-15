import { Save } from "lucide-react";

const FormButtonSave = () => {
  return (
    <button
      onClick={() => alert("Guardado!")}
      className="max-w-2xs bg-blue-500 text-white rounded-2xl shadow-md px-4 py-3 flex items-center justify-between mt-8"
    >
      <Save></Save>
      <p>Guardar</p>
    </button>
  );
};

export default FormButtonSave;
