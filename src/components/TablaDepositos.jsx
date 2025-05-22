import { Trash2, FilePen } from "lucide-react";

const TablaDepositos = ({ depositos }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Direccion</th>
            <th className="px-4 py-2 border-b">Provincia</th>
            <th className="px-4 py-2 border-b">Pais</th>
            <th className="px-4 py-2 border-b">Contacto</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {depositos.map((depositos) => (
            <tr key={depositos.id}>
              <td className="px-4 py-2 border-b">{depositos.nombre}</td>
              <td className="px-4 py-2 border-b">{depositos.direccion}</td>
              <td className="px-4 py-2 border-b">{depositos.provincia}</td>
              <td className="px-4 py-2 border-b">{depositos.pais}</td>
              <td className="px-4 py-2 border-b">{depositos.contacto}</td>
              <td className="px-4 py-2 border-b ">
                <a
                  path={`/nuevoDeposito`}
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

export default TablaDepositos;
