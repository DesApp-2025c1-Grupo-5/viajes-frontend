import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [filtros, setFiltros] = useState({
    tipoDeViaje: '',
    fecha_salida: '',
    nroViaje: '',
    empresa: '',
    chofer: '',
    patente: '',
    provinciaOrigen: '',
    provinciaDestino: ''
  });

  const handleChange = (field, value) => {
    setFiltros({ ...filtros, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filtros);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-4">
      {/* Tipo de Viaje */}
      <div className="relative">
        <select
          value={filtros.tipoDeViaje}
          onChange={(e) => handleChange('tipoDeViaje', e.target.value)}
          className="border rounded px-3 py-2"
        >
          
          <option value="">Todos los Viajes</option>
          <option value="Nacional">Viajes Nacionales</option>
          <option value="Internacional">Viajes Internacionales</option>
        </select>
      </div>

      {/* Fecha de salida */}
      <input
        type="date"
        value={filtros.fecha_salida ? filtros.fecha_salida.split("T")[0] : ""}
        onChange={(e) =>
          handleChange('fecha_salida', new Date(e.target.value).toISOString())
        }
        className="border rounded px-3 py-2"
      />

      {/* Número de viaje */}
      <input
        type="text"
        placeholder="N° de viaje"
        value={filtros.nroViaje}
        onChange={(e) => handleChange('nroViaje', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Empresa */}
      <input
        type="text"
        placeholder="Empresa"
        value={filtros.empresa}
        onChange={(e) => handleChange('empresa', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Chofer */}
      <input
        type="text"
        placeholder="Chofer"
        value={filtros.chofer}
        onChange={(e) => handleChange('chofer', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Vehículo */}
      <input
        type="text"
        placeholder="Patente"
        value={filtros.patente}
        onChange={(e) => handleChange('patente', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Provincia de Origen */}
      <input
        type="text"
        placeholder="Provincia origen"
        value={filtros.provinciaOrigen}
        onChange={(e) => handleChange('provinciaOrigen', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Provincia de Destino */}
      <input
        type="text"
        placeholder="Provincia destino"
        value={filtros.provinciaDestino}
        onChange={(e) => handleChange('provinciaDestino', e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* Filtrar button */}
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