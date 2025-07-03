import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import transportistasService from "../services/EmpresasTransportistasService";
import { ToastContainer, toast } from "react-toastify";

const TablaTransportistas = ({
  transportistas,
  setTransportistas,
  setTransportistasFiltrado,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">
            ¿Estás seguro de eliminar esta empresa transportista?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                closeToast();

                try {
                  await transportistasService.deleteTransportista(id);
                  toast.success(
                    "Empresa transportista eliminada correctamente"
                  );
                  setTransportistas((prev) => prev.filter((v) => v.id !== id));
                  setTransportistasFiltrado((prev) =>
                    prev.filter((v) => v.id !== id)
                  );
                } catch (error) {
                  console.error("Error al eliminar:", error);
                  toast.error("No se pudo eliminar la empresa transportista");
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
              <th className="px-4 py-2 border-b">Razón Social</th>
              <th className="px-4 py-2 border-b">CUIT</th>
              <th className="px-4 py-2 border-b">Domicilio Fiscal</th>
              <th className="px-4 py-2 border-b">Teléfono</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transportistas.map((transportista) => (
              <tr
                key={transportista.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  navigate(`/empresasTransportistas/${transportista.id}`)
                }
              >
                <td className="px-4 py-2 border-b">
                  {transportista.razon_social}
                </td>
                <td className="px-4 py-2 border-b">{transportista.cuit_rut}</td>
                <td className="px-4 py-2 border-b">
                  {transportista.domicilio_fiscal}
                </td>
                <td className="px-4 py-2 border-b">{transportista.telefono}</td>
                <td className="px-4 py-2 border-b">{transportista.email}</td>
                <td className="px-4 py-2 border-b ">
                  <Link
                    path={`/nuevoTransportista`}
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
                      handleDelete(transportista.id);
                    }}
                    className="p-1"
                    title="Eliminar transportista"
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

export default TablaTransportistas;
