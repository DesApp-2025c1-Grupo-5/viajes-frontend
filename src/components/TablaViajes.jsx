import { Trash2, FilePen } from "lucide-react";
import viajesServices from "../services/ViajesService";

const TablaViajes = ({ viajes, setViaje, setViajesFiltrados }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este vehículo?")) return;

    try {
      await viajesServices.deleteViaje(id);
      alert("✅ Viaje eliminado correctamente");
      setViaje(viajes.filter((v) => v.id !== id));
      setViaje((prev) => prev.filter((v) => v.id !== id));
      setViajesFiltrados((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ No se pudo eliminar el viaje");
    }
  };

  const parseFecha = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + 1);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
  };

  return (
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
              <td className="px-4 py-2 border-b">{viaje.depositoOrigen.nombre}</td>
              <td className="px-4 py-2 border-b">{viaje.depositoDestino.nombre}</td>
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
      <div>
          {!viajes.length ?
          <h1 className="text-center  mt-8">No hay resultados</h1>
          : ""
          }
      </div>
    </div>
  );
};

export default TablaViajes;
