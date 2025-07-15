import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FormButtonCancel = ({to="/"}) => {
  const navigate = useNavigate();

  const cancelar = () => {
    navigate(-1);
  }

  return (
    <button
      onClick={cancelar}
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
