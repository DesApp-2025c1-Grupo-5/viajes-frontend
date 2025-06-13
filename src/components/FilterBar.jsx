import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

const ComboboxField = ({ label, value, onChange, options }) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-60">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full border rounded px-3 py-2"
            placeholder={label}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(val) => val}
          />
          {filtered.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg">
              {filtered.map((item, index) => (
                <Combobox.Option
                  key={index}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

const FilterBar = ({ onFilter, viajes }) => {
  const [filtros, setFiltros] = useState({
    tipoDeViaje: "",
    fecha_salida: "",
    nroViaje: "",
    empresa: "",
    chofer: "",
    patente: "",
    provinciaOrigen: "",
    provinciaDestino: "",
  });

  const [empresas, setEmpresas] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [patentes, setPatentes] = useState([]);
  const [provinciasOrigen, setProvinciasOrigen] = useState([]);
  const [provinciasDestino, setProvinciasDestino] = useState([]);

  useEffect(() => {
    setEmpresas([
      ...new Set(
        viajes.map((v) => v.empresaTransportista?.razon_social).filter(Boolean)
      ),
    ]);
    setChoferes([
      ...new Set(viajes.map((v) => String(v.id_chofer)).filter(Boolean)),
    ]);
    setPatentes([
      ...new Set(viajes.map((v) => v.vehiculo?.patente).filter(Boolean)),
    ]);
    setProvinciasOrigen([
      ...new Set(viajes.map((v) => v.provinciaOrigen).filter(Boolean)),
    ]);
    setProvinciasDestino([
      ...new Set(viajes.map((v) => v.provinciaDestino).filter(Boolean)),
    ]);
  }, [viajes]);

  const handleChange = (field, value) => {
    setFiltros((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filtros);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-4">
      <div>
        <select
          value={filtros.tipoDeViaje}
          onChange={(e) => handleChange("tipoDeViaje", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los Viajes</option>
          <option value="Nacional">Viajes Nacionales</option>
          <option value="Internacional">Viajes Internacionales</option>
        </select>
      </div>

      <input
        type="date"
        value={filtros.fecha_salida ? filtros.fecha_salida.split("T")[0] : ""}
        onChange={(e) =>
          handleChange("fecha_salida", new Date(e.target.value).toISOString())
        }
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        placeholder="N° de viaje"
        value={filtros.nroViaje}
        onChange={(e) => handleChange("nroViaje", e.target.value)}
        className="border rounded px-3 py-2"
      />

      <ComboboxField
        label="Empresa"
        value={filtros.empresa}
        onChange={(val) => handleChange("empresa", val)}
        options={empresas}
      />
      <ComboboxField
        label="Chofer"
        value={filtros.chofer}
        onChange={(val) => handleChange("chofer", val)}
        options={choferes}
      />
      <ComboboxField
        label="Patente"
        value={filtros.patente}
        onChange={(val) => handleChange("patente", val)}
        options={patentes}
      />
      <ComboboxField
        label="Provincia origen"
        value={filtros.provinciaOrigen}
        onChange={(val) => handleChange("provinciaOrigen", val)}
        options={provinciasOrigen}
      />
      <ComboboxField
        label="Provincia destino"
        value={filtros.provinciaDestino}
        onChange={(val) => handleChange("provinciaDestino", val)}
        options={provinciasDestino}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Filtrar
      </button>
    </form>
  );
};

export default FilterBar;
