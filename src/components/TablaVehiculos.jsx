import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import vehiculoService from "../services/VehiculosService";

const TablaVehiculos = ({ vehiculos, setVehiculos, setVehiculosFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este vehículo?")) return;

    try {
      await vehiculoService.deleteVehiculo(id);
      alert("✅ Vehículo eliminado correctamente");
      setVehiculos(vehiculos.filter((v) => v.id !== id));
      setVehiculos((prev) => prev.filter((v) => v.id !== id));
      setVehiculosFiltrado((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ No se pudo eliminar el vehículo");
    }
  };

  return (
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
                {vehiculo.nombre_transportista}
              </td>
              <td className="px-4 py-2 border-b ">
                <Link
                  to={`/nuevoVehiculo`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                  onClick={(e) => e.stopPropagation()} // para que no dispare el onClick del tr
                >
                  <FilePen
                    size={25}
                    className="align-middle cursor-pointer inline-block"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evitar que el click propague y navegue
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
    </div>
  );
};

export default TablaVehiculos;
