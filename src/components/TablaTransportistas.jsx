import { Trash2, FilePen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import transportistasService from "../services/EmpresasTransportistasService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";

const TablaTransportistas = ({
  transportistas,
  setTransportistas,
  setTransportistasFiltrado,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const nombreEmpresa = transportistas.find((t) => t.id == id)?.razon_social;
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">
            ¿Estás seguro de eliminar esta empresa transportista?
            <br />
            <span className="italic font-semibold text-purple-400">
              {nombreEmpresa || ""}
            </span>
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
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">
                Razón Social
              </th>
              <th className="px-4 py-2 border-b border-gray-300">CUIT</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Domicilio Fiscal
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Teléfono</th>
              <th className="px-4 py-2 border-b border-gray-300">Email</th>
              <th className="px-4 py-2 border-b border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transportistas.map((transportista) => (
              <tr
                key={transportista.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  navigate(`/transportistas/view/${transportista.id}`)
                }
              >
                <td className="px-4 py-2 border-b border-gray-300">
                  {transportista.razon_social}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {transportista.cuit_rut}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {transportista.domicilio_fiscal}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {transportista.telefono}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {transportista.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <Link
                    to={`/transportistas/${transportista.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={(e) => e.stopPropagation()}
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
        <SinResultados lista={transportistas} />
      </div>
    </>
  );
};

export default TablaTransportistas;
