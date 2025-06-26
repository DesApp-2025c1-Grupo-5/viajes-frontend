import { Trash2, FilePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import choferesService from "../services/ChoferesService";

const TablaChoferes = ({ choferes, setChoferes, setChoferesFiltrado }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este chofer?")) return;

    try {
      await choferesService.deleteChofer(id);
      alert("✅ Chofer eliminado correctamente");
      setChoferes(choferes.filter((v) => v.id !== id));
      setChoferes((prev) => prev.filter((v) => v.id !== id));
      setChoferesFiltrado((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ No se pudo eliminar el chofer");
    }
  };

  const parseFecha = (isoString) => {
    const date = new Date(isoString);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}-${pad(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  };

  return (
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
  );
};

export default TablaChoferes;
