import { X } from "lucide-react";

const FormButtonCancel = () => {
  return (
    <button
      onClick={() => alert("Cancelado!")}
      className="w-36 bg-red-500 text-white rounded-2xl shadow-md px-4 py-3 flex justify-between mt-8 hover:bg-red-600 hover:scale-105"
    >
      <X></X>
      <p>Cancelar</p>
    </button>
  );
};

export default FormButtonCancel;
