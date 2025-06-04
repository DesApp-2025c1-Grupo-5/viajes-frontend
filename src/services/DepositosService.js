import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/depositos`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener depósitos:", error);
    throw error;
  }
};

service.create = async (nuevoDeposito) => {
  try {
    const respuesta = await axios.post(`${API_URL}/depositos`, nuevoDeposito);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo depósito:", error)
  }
}

export default service;