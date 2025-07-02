import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;
console.log(API_URL);

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/empresasTransportistas`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener transportistas:", error);
    throw error;
  }
};

service.create = async (nuevaEmpresa) => {
  try {
    const respuesta = await axios.post(
      `${API_URL}/empresasTransportistas`,
      nuevaEmpresa
    );
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear la nueva empresa transportista:", error);
  }
};

service.getTransportistaById = async (id) => {
  try {
    const respuesta = await axios.get(
      `${API_URL}/empresasTransportistas/${id}`
    );
    return respuesta.data;
  } catch (error) {
    console.error(
      "No existe empresa transportista con el identificador:",
      error
    );
  }
};

service.updateTransportista = async (id, transportista) => {
  try {
    const respuesta = await axios.put(
      `${API_URL}/empresasTransportistas/${id}`,
      transportista
    );
    return respuesta.data;
  } catch (error) {
    console.error("No existe la empresa transportista con el id:", error);
  }
};

service.deleteTransportista = async (id) => {
  try {
    const respuesta = await axios.delete(
      `${API_URL}/empresasTransportistas/${id}`
    );
    return respuesta.data;
  } catch (error) {
    console.error("No existe la empresa transportista con el id:", error);
  }
};

service.getCountEmpresasActivas = async () => {
  try {
    const respuesta = await axios.get(
      `${API_URL}/empresasTransportistas/count`
    );
    return respuesta.data.count;
  } catch (error) {
    console.error(
      "Error al obtener la cantidad de empresas transportistas:",
      error
    );
    throw error;
  }
};

export default service;
