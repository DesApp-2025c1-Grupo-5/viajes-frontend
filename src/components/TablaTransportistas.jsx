const TablaTransportistas = ({ transportistas }) => {
    return (
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
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
                <td className="px-4 py-2 border-b">{transportistas.razon_social}</td>
                <td className="px-4 py-2 border-b">{transportistas.cuit}</td>
                <td className="px-4 py-2 border-b">{transportistas.domicilio_fiscal}</td>
                <td className="px-4 py-2 border-b">{transportistas.telefono}</td>
                <td className="px-4 py-2 border-b">{transportistas.email}</td>
             
                <td className="px-4 py-2 border-b">
                    <button className="text-blue-600 hover:text-blue-800">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Eliminar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default TablaTransportistas;