import { Plus, Map } from "lucide-react";

const Card = (props) => {
  return (
    <div
      className={`${props.ancho} ${props.alto} bg-white rounded-2xl shadow-md px-4 py-3 flex items-center justify-between border-l-4 ${props.colorBorde} mt-8`}
    >
      <div>
        <p className="text-sm text-black-600">{props.tituloDeLaCarta}</p>
        <p className="text-xl font-bold text-gray-800">{props.cantidad}</p>
      </div>
      <div className="bg-pink-100 rounded-full p-2">
        <Map className="h-6 w-6 text-pink-500" />
      </div>
      <div>
        <button
          className={`${props.colorPlus} hover:bg-pink-600 text-white rounded-full p-2`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Card;
