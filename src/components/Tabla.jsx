const Tabla = ({ viajes }) => {
    return (
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Origen</th>
                <th className="px-4 py-2 border-b">Destino</th>
                <th className="px-4 py-2 border-b">Fecha salida</th>
                <th className="px-4 py-2 border-b">Fecha llegada</th>
                <th className="px-4 py-2 border-b">Vehiculo</th>
                <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {viajes.map((viaje) => (
                <tr key={viaje.id}>
                <td className="px-4 py-2 border-b">{viaje.id}</td>
                <td className="px-4 py-2 border-b">{viaje.origen}</td>
                <td className="px-4 py-2 border-b">{viaje.destino}</td>
                <td className="px-4 py-2 border-b">{viaje.fecha_salida}</td>
                <td className="px-4 py-2 border-b">{viaje.fecha_llegada}</td>
                <td className="px-4 py-2 border-b">{viaje.vehiculo}</td>
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

export default Tabla;