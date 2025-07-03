import { Trash2, FilePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import choferesService from "../services/ChoferesService";
import { ToastContainer, toast } from "react-toastify";

const TablaChoferes = ({ choferes, setChoferes, setChoferesFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <p className="mb-2">¿Estás seguro de eliminar este chofer?</p>
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

  const parseFecha = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + 1);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}-${pad(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto my-5">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b text-left">Licencia</th>
              <th className="px-4 py-2 border-b text-left">Nombre Completo</th>
              <th className="px-4 py-2 border-b text-left">Fecha Nac.</th>
              <th className="px-4 py-2 border-b text-left">DNI</th>
              <th className="px-4 py-2 border-b text-left">Vehículo</th>
              <th className="px-4 py-2 border-b text-left">Transportista</th>
              <th className="px-4 py-2 border-b ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* <td className="px-4 py-2 border-b">{parseFecha(viajes.fecha_salida)}</td> */}
            {choferes.map((chofer) => (
              <tr
                key={chofer.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/choferes/${chofer.id}`)}
              >
                <td className="px-4 py-2 border-b">{chofer.licencia}</td>
                <td className="px-4 py-2 border-b">
                  {chofer.nombre} {chofer.apellido}
                </td>
                <td className="px-4 py-2 border-b">
                  {parseFecha(chofer.fecha_nacimiento)}
                </td>
                <td className="px-4 py-2 border-b">{chofer.dni}</td>
                <td className="px-4 py-2 border-b">
                  {chofer.vehiculo?.patente || "Sin vehículo"}
                </td>
                <td className="px-4 py-2 border-b">
                  {chofer.empresaTransportista?.razon_social || "Sin empresa"}
                </td>
                <td className="px-4 py-2 border-b ">
                  <a
                    path={`/nuevoChofer`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FilePen
                      size={25}
                      className="align-middle cursor-pointer inline-block"
                    />
                  </a>
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
      </div>
    </>
  );
};

export default TablaChoferes;
