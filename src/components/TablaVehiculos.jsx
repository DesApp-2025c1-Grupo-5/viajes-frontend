const TablaVehiculos = ({ vehiculos }) => {
    return (
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
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
                <tr key={vehiculos.id}>
                <td className="px-4 py-2 border-b">{vehiculos.patente}</td>
                <td className="px-4 py-2 border-b">{vehiculos.modelo}</td>
                <td className="px-4 py-2 border-b">{vehiculos.anio}</td>
                <td className="px-4 py-2 border-b">{vehiculos.capacidad}</td>
                <td className="px-4 py-2 border-b">{vehiculos.tipo}</td>
                <td className="px-4 py-2 border-b">{vehiculos.transportista}</td>
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

export default TablaVehiculos;