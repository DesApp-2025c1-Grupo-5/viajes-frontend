import { Trash2, FilePen } from "lucide-react";

const TablaTransportistas = ({ transportistas }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 border-b">Razón Social</th>
            <th className="px-4 py-2 border-b">CUIT</th>
            <th className="px-4 py-2 border-b">Domicilio Fiscal</th>
            <th className="px-4 py-2 border-b">Teléfono</th>
            <th className="px-4 py-2 border-b">Email</th>

            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transportistas.map((transportistas) => (
            <tr key={transportistas.id}>
              <td className="px-4 py-2 border-b">
                {transportistas.razon_social}
              </td>
              <td className="px-4 py-2 border-b">{transportistas.cuit}</td>
              <td className="px-4 py-2 border-b">
                {transportistas.domicilio_fiscal}
              </td>
              <td className="px-4 py-2 border-b">{transportistas.telefono}</td>
              <td className="px-4 py-2 border-b">{transportistas.email}</td>
              <td className="px-4 py-2 border-b ">
                <a
                  path={`/nuevoTransportista`}
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

export default TablaTransportistas;
