import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import vehiculoService from "../services/VehiculosService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";

const TablaVehiculos = ({ vehiculos, setVehiculos, setVehiculosFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const vehiculo = vehiculos.find(v => v.id == id);
    const nombreVehiculo = 
      vehiculo 
      ? `(${vehiculo.patente})  ${vehiculo.marca} / ${vehiculo.modelo}`
      : "";
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">¿Estás seguro de eliminar este vehículo?
            <br /><span className="italic font-semibold text-red-400">{nombreVehiculo || ""}</span>
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
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b">Patente</th>
              <th className="px-4 py-2 border-b">Modelo</th>
              <th className="px-4 py-2 border-b">Año</th>
              <th className="px-4 py-2 border-b">Capacidad</th>
              <th className="px-4 py-2 border-b">Tipo</th>
              <th className="px-4 py-2 border-b">Transportista</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr
                key={vehiculo.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/vehiculos/${vehiculo.id}`)}
              >
                <td className="px-4 py-2 border-b">{vehiculo.patente}</td>
                <td className="px-4 py-2 border-b">{vehiculo.modelo}</td>
                <td className="px-4 py-2 border-b">{vehiculo.año}</td>
                <td className="px-4 py-2 border-b">{vehiculo.capacidad}</td>
                <td className="px-4 py-2 border-b">
                  {vehiculo.tipo_de_vehiculo}
                </td>
                <td className="px-4 py-2 border-b">
                  {vehiculo.empresa?.razon_social}
                </td>
                <td className="px-4 py-2 border-b">
                  <Link
                    to={`/nuevoVehiculo`}
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
        <SinResultados lista={vehiculos}/>
      </div>
    </>
  );
};

export default TablaVehiculos;
