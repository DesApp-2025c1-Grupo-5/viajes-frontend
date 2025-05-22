import { Trash2, FilePen } from "lucide-react";

const TablaViajes = ({ viajes }) => {
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
          {viajes.map((viajes) => (
            <tr key={viajes.id}>
              <td className="px-4 py-2 border-b">{viajes.id}</td>
              <td className="px-4 py-2 border-b">{viajes.origen}</td>
              <td className="px-4 py-2 border-b">{viajes.destino}</td>
              <td className="px-4 py-2 border-b">{viajes.fecha_salida}</td>
              <td className="px-4 py-2 border-b">{viajes.fecha_llegada}</td>
              <td className="px-4 py-2 border-b">{viajes.vehiculo}</td>
              <td className="px-4 py-2 border-b ">
                <a
                  path={`/nuevoVehiculo`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  <FilePen size={25} className="align-middle inline-block" />
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

export default TablaViajes;
