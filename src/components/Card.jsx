import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  const Icono = props.icono;

  return (
    <div
      className={`${props.ancho} ${props.alto} bg-white rounded-2xl shadow-2xl px-4 py-4 flex items-center justify-between border-l-4 ${props.colorBorde} mt-8`}
    >
      <div className="w-4/5">
        <p className="text-xl text-gray-600">{props.tituloDeLaCarta}</p>
        <p className="text-xl font-bold text-gray-800">{props.cantidad}</p>
      </div>
      <div className="flex ml-auto mr-12">
        <div className={`${props.bgIcono} rounded-full p-2`}>
          {Icono && <Icono className={`h-6 w-6 ${props.colorIcono}`} />}
        </div>
        <div>
          <button
            onClick={handleClick}
            className={`${props.colorPlus} ${props.colorHover} text-white rounded-full p-2 ml-6`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
