import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import viajesServices from "../services/ViajesService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";
import parseFecha from "../utils/parseFecha";

const TablaViajes = ({ viajes, setViaje, setViajesFiltrados }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col z-10">
          <p className="mb-2">¿Estás seguro de eliminar este viaje?
            <br /><span className="italic font-semibold text-pink-300">Viaje con ID: {id}</span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                closeToast();

                try {
                  await viajesServices.deleteViaje(id);
                  toast.success("Viaje eliminado correctamente");
                  setViaje((prev) => prev.filter((v) => v.id !== id));
                  setViajesFiltrados((prev) => prev.filter((v) => v.id !== id));
                } catch (error) {
                  console.error("Error al eliminar:", error);
                  toast.error("No se pudo eliminar el viaje");
                }
              }}
            >
              Sí
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  

  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200 text-gray-700 ">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Depositos</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Fechas</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Empresa Transportista</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Chofer</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left ">Vehiculo</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((viaje) => (
              
              <tr key={viaje.id} 
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/viajes/view/${viaje.id}`)}
              >
                <td className="px-4 py-2 border-b border-gray-300">{viaje.id}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <span className="text-orange-400 font-semibold pr-4">Origen: </span>{viaje.depositoOrigen.nombre}
                  <br />
                  <span className="text-orange-400 font-semibold pr-2">Destino: </span>{viaje.depositoDestino.nombre}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <span className="text-gray-500 font-semibold pr-6">Salida: </span>{parseFecha(viaje.fecha_salida)}
                  <br />
                  <span className="text-gray-500 font-semibold pr-2">Llegada: </span>{parseFecha(viaje.fecha_llegada)}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {viaje.empresaTransportista?.razon_social || "Sin empresa"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {viaje.chofer? `${viaje.chofer.nombre} ${viaje.chofer.apellido}` : "Sin chofer"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {viaje.vehiculo? `${viaje.vehiculo.marca} ${viaje.vehiculo.modelo}` : ""}
                  <br />
                  {viaje.vehiculo?.patente || "Sin vehículo"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <Link
                    to={`/viajes/${viaje.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilePen
                      size={25}
                      className="align-middle cursor-pointer inline-block"
                    />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // evitar que el click propague y navegue
                      handleDelete(viaje.id);
                    }}
                    className="p-1"
                    title="Eliminar vehículo"
                  >
                    <Trash2
                      size={25}
                      className="text-red-600 hover:text-red-800 cursor-pointer align-middle inline-block"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SinResultados lista={viajes}/>
      </div>
    </>
  );
};

export default TablaViajes;
