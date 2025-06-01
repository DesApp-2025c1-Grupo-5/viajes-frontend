import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

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
    const respuesta = await axios.post(`${API_URL}/empresasTransportistas`, nuevaEmpresa);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear la nueva empresa transportista:", error)
  }
}

export default service;