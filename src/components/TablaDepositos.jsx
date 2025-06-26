import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import depositosService from "../services/DepositosService";

const TablaDepositos = ({ depositos, setDepositos, setDepositosFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este deposito?")) return;

    try {
      await depositosService.deleteDeposito(id);
      alert("✅ Deposito eliminado correctamente");
      setDepositos(depositos.filter((v) => v.id !== id));
      setDepositos((prev) => prev.filter((v) => v.id !== id));
      setDepositosFiltrado((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ No se pudo eliminar el depósito");
    }
  };

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
          {depositos.map((deposito) => (
            <tr
              key={deposito.id}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/depositos/${deposito.id}`)}
            >
              <td className="px-4 py-2 border-b">{deposito.nombre}</td>
              <td className="px-4 py-2 border-b">{deposito.direccion}</td>
              <td className="px-4 py-2 border-b">{deposito.provincia}</td>
              <td className="px-4 py-2 border-b">{deposito.pais}</td>
              <td className="px-4 py-2 border-b">{deposito.contacto}</td>
              <td className="px-4 py-2 border-b ">
                <Link
                  path={`/nuevoDeposito`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  <FilePen
                    size={25}
                    className="align-middle cursor-pointer inline-block"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evitar que el click propague y navegue
                    handleDelete(deposito.id);
                  }}
                  className="p-1"
                  title="Eliminar deposito"
                >
                  <Trash2
                    size={25}
                    className="text-red-600 hover:text-red-800 cursor-pointer align-middle inline-block"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDepositos;
