import { X } from "lucide-react";

const FormButtonCancel = () => {
  return (
    <button
      onClick={() => alert("Cancelado!")}
      className="max-w-2xs bg-red-500 text-white rounded-2xl shadow-md px-4 py-3 flex items-center justify-between mt-8"
    >
      <X></X>
      <p>Cancelar</p>
    </button>
  );
};

export default FormButtonCancel;
