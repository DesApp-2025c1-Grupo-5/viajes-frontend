import { Trash2, FilePen } from "lucide-react";

const TablaChoferes = ({ choferes }) => {
  return (
    <div className="overflow-x-auto my-5">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 border-b text-left">Licencia</th>
            <th className="px-4 py-2 border-b text-left">Nombre Completo</th>
            <th className="px-4 py-2 border-b text-left">Fecha Nac.</th>
            <th className="px-4 py-2 border-b text-left">DNI</th>
            <th className="px-4 py-2 border-b text-left">Vehículo</th>
            <th className="px-4 py-2 border-b text-left">Transportista</th>
            <th className="px-4 py-2 border-b ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {choferes.map((choferes) => (
            <tr key={choferes.id}>
              <td className="px-4 py-2 border-b">{choferes.licencia}</td>
              <td className="px-4 py-2 border-b">{choferes.nombre}</td>
              <td className="px-4 py-2 border-b">
                {choferes.fecha_nacimiento}
              </td>
              <td className="px-4 py-2 border-b">{choferes.dni}</td>
              <td className="px-4 py-2 border-b">{choferes.vehiculo}</td>
              <td className="px-4 py-2 border-b">{choferes.transportista}</td>
              <td className="px-4 py-2 border-b ">
                <a
                  path={`/nuevoChofer`}
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

export default TablaChoferes;
