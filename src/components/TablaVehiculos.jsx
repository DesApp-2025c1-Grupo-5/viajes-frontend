import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import vehiculoService from "../services/VehiculosService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";

const TablaVehiculos = ({ vehiculos, setVehiculos, setVehiculosFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const vehiculo = vehiculos.find((v) => v.id == id);
    const nombreVehiculo = vehiculo
      ? `${vehiculo.marca} / ${vehiculo.modelo} (${vehiculo.patente})`
      : "";
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">
            ¿Estás seguro de eliminar este vehículo?
            <br />
            <span className="italic font-semibold text-red-400">
              {nombreVehiculo || ""}
            </span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                closeToast();

                try {
                  await vehiculoService.deleteVehiculo(id);
                  toast.success("Vehículo eliminado correctamente");
                  setVehiculos((prev) => prev.filter((v) => v.id !== id));
                  setVehiculosFiltrado((prev) =>
                    prev.filter((v) => v.id !== id)
                  );
                } catch (error) {
                  console.error("Error al eliminar:", error);
                  toast.error("No se pudo eliminar el vehículo");
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
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">Marca</th>
              <th className="px-4 py-2 border-b border-gray-300">Modelo</th>
              <th className="px-4 py-2 border-b border-gray-300">Patente</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Empresa Transportista
              </th>
              <th className="max-w-15 px-4 py-2 border-b border-gray-300">
                Tipo
              </th>
              <th className="text-center px-4 py-2 border-b border-gray-300">
                Capacidad
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr
                key={vehiculo.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/vehiculos/view/${vehiculo.id}`)}
              >
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehiculo.marca}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehiculo.modelo}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehiculo.patente}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehiculo.empresa?.razon_social}
                </td>
                <td className="max-w-15 px-4 py-2 border-b border-gray-300">
                  {vehiculo.tipo_de_vehiculo}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">
                  {vehiculo.capacidad}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <Link
                    to={`/vehiculos/${vehiculo.id}`}
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
                      e.stopPropagation();
                      handleDelete(vehiculo.id);
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
        <SinResultados lista={vehiculos} />
      </div>
    </>
  );
};

export default TablaVehiculos;
