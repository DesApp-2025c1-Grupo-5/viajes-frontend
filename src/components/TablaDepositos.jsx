const TablaDepositos = ({ depositos }) => {
    return (
        <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
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

export default TablaDepositos;