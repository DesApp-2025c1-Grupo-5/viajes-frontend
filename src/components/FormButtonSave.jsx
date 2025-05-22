import { Save } from "lucide-react";

const FormButtonSave = () => {
  return (
    <button
      onClick={() => alert("Guardado!")}
      className="w-36 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-md px-4 py-3 flex justify-between mt-8"
    >
      <Save></Save>
      <p>Guardar</p>
    </button>
  );
};

export default FormButtonSave;
