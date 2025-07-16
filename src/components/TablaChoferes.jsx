import { Trash2, FilePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import choferesService from "../services/ChoferesService";
import { ToastContainer, toast } from "react-toastify";
import SinResultados from "./SinResultados";
import { Link } from "react-router-dom";
import parseFecha from "../utils/parseFecha";

const TablaChoferes = ({ choferes, setChoferes, setChoferesFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const chofer = choferes.find((c) => c.id == id);
    const nombreChofer = chofer
      ? `${chofer.nombre} ${chofer.apellido} (${chofer.licencia})`
      : "";

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">
            ¿Estás seguro de eliminar este chofer?
            <br />
            <span className="italic text-emerald-400">
              {nombreChofer || ""}
            </span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                closeToast();

                try {
                  await choferesService.deleteChofer(id);
                  toast.success("Chofer eliminado correctamente");
                  setChoferes((prev) => prev.filter((v) => v.id !== id));
                  setChoferesFiltrado((prev) =>
                    prev.filter((v) => v.id !== id)
                  );
                } catch (error) {
                  console.error("Error al eliminar:", error);
                  toast.error("No se pudo eliminar el chofer");
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
      <div className="overflow-x-auto my-5">
        <table className="min-w-full bg-white border border-gray-200 text-gray-700">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Licencia
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Nombre Completo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Fecha Nac.
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                DNI
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Vehículo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Empresa Transportista
              </th>
              <th className="px-4 py-2 border-b border-gray-300 ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {choferes.map((chofer) => (
              <tr
                key={chofer.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/choferes/view/${chofer.id}`)}
              >
                <td className="px-4 py-2 border-b border-gray-300">
                  {chofer.licencia}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {chofer.nombre} {chofer.apellido}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {parseFecha(chofer.fecha_nacimiento)}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {chofer.dni}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {chofer.vehiculo? `${chofer.vehiculo.marca} (${chofer.vehiculo.patente})` : "Sin vehículo"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {chofer.empresaTransportista?.razon_social || "Sin empresa"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 ">
                  <Link
                    to={`/choferes/${chofer.id}`}
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
                      e.stopPropagation();
                      handleDelete(chofer.id);
                    }}
                    className="p-1"
                    title="Eliminar chofer"
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
        <SinResultados lista={choferes} />
      </div>
    </>
  );
};

export default TablaChoferes;
