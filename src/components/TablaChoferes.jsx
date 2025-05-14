const TablaChoferes = ({ choferes }) => {
    return (
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-4 py-2 border-b">Licencia</th>
                <th className="px-4 py-2 border-b">Nombre Completo</th>
                <th className="px-4 py-2 border-b">Fecha Nac.</th>
                <th className="px-4 py-2 border-b">DNI</th>
                <th className="px-4 py-2 border-b">Vehículo</th>
                <th className="px-4 py-2 border-b">Transportista</th>
                <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {choferes.map((choferes) => (
                <tr key={choferes.id}>
                <td className="px-4 py-2 border-b">{choferes.licencia}</td>
                <td className="px-4 py-2 border-b">{choferes.nombre}</td>
                <td className="px-4 py-2 border-b">{choferes.fecha_nacimiento}</td>
                <td className="px-4 py-2 border-b">{choferes.dni}</td>
                <td className="px-4 py-2 border-b">{choferes.vehiculo}</td>
                <td className="px-4 py-2 border-b">{choferes.transportista}</td>
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

export default TablaChoferes;