import { Trash2, FilePen } from "lucide-react";

const TablaVehiculos = ({ vehiculos }) => {
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
          {vehiculos.map((vehiculos) => (
            <tr key={vehiculos.id} className="hover:bg-gray-200 cursor-pointer">
              <td className="px-4 py-2 border-b">{vehiculos.patente}</td>
              <td className="px-4 py-2 border-b">{vehiculos.modelo}</td>
              <td className="px-4 py-2 border-b">{vehiculos.año}</td>
              <td className="px-4 py-2 border-b">{vehiculos.capacidad}</td>
              <td className="px-4 py-2 border-b">
                {vehiculos.tipo_de_vehiculo}
              </td>
              <td className="px-4 py-2 border-b">
                {vehiculos.nombre_transportista}
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
                <Trash2
                  size={25}
                  className="text-red-600 hover:text-red-800 cursor-pointer align-middle inline-block"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaVehiculos;
