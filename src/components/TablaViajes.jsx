import { Trash2, FilePen } from "lucide-react";
import viajesServices from "../services/ViajesService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";

const TablaViajes = ({ viajes, setViaje, setViajesFiltrados }) => {
  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">¿Estás seguro de eliminar este viaje?</p>
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

  const parseFecha = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + 1);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}-${pad(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Origen</th>
              <th className="px-4 py-2 border-b">Destino</th>
              <th className="px-4 py-2 border-b">Fecha de salida</th>
              <th className="px-4 py-2 border-b">Fecha de llegada</th>
              <th className="px-4 py-2 border-b">Vehiculo</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((viaje) => (
              <tr key={viaje.id} className="hover:bg-gray-200 cursor-pointer">
                <td className="px-4 py-2 border-b">{viaje.id}</td>
                <td className="px-4 py-2 border-b">
                  {viaje.depositoOrigen.nombre}
                </td>
                <td className="px-4 py-2 border-b">
                  {viaje.depositoDestino.nombre}
                </td>
                <td className="px-4 py-2 border-b">
                  {parseFecha(viaje.fecha_salida)}
                </td>
                <td className="px-4 py-2 border-b">
                  {parseFecha(viaje.fecha_llegada)}
                </td>
                <td className="px-4 py-2 border-b">
                  {viaje.vehiculo?.patente || "Sin vehículo"}
                </td>
                <td className="px-4 py-2 border-b ">
                  <a
                    path={`/nuevoVehiculo`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FilePen
                      size={25}
                      className="align-middle cursor-pointer inline-block"
                    />
                  </a>
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
