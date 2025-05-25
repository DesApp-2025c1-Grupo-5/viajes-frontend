import { XCircle } from "lucide-react";

const FormButtonCancel = () => {
  return (
    <button
      onClick={() => alert("Cancelado!")}
      className="w-36 bg-white text-red-500 border border-red-500 rounded-2xl shadow-md px-4 py-3 mt-8 cursor-pointer hover:border-red-600 hover:text-red-600 hover:scale-105 transition-all"
    >
      <div className="flex items-center justify-center gap-1">
        <XCircle />
        <span>Cancelar</span>
      </div>
    </button>
  );
};

export default FormButtonCancel;
