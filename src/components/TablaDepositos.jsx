import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import depositosService from "../services/DepositosService";
import { ToastContainer, toast } from "react-toastify";

const TablaDepositos = ({ depositos, setDepositos, setDepositosFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">¿Estás seguro de eliminar este depósito?</p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                closeToast();

                try {
                  await depositosService.deleteDeposito(id);
                  toast.success("Deposito eliminado correctamente");
                  setDepositos((prev) => prev.filter((v) => v.id !== id));
                  setDepositosFiltrado((prev) =>
                    prev.filter((v) => v.id !== id)
                  );
                } catch (error) {
                  console.error("Error al eliminar:", error);
                  toast.error("No se pudo eliminar el deposito");
                }
              }}
            >
              Sí
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default TablaDepositos;
