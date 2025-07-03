import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;
console.log(API_URL);

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/viajes`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    throw error;
  }
};

service.post = async (nuevoViaje) => {
  try {
    const respuesta = await axios.post(`${API_URL}/viajes`, nuevoViaje);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo viaje:", error);
  }
};

service.getViajeById = async (id) => {
  try {
    const respuesta = await axios.get(`${API_URL}/viajes/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe viaje con el id:", error);
  }
};

service.updateViaje = async (id, viaje) => {
  try {
    const respuesta = await axios.put(`${API_URL}/viajes/${id}`, viaje);
    return respuesta.data;
  } catch (error) {
    console.error("No existe viaje con el id:", error);
  }
};

service.deleteViaje = async (id) => {
  try {
    const respuesta = await axios.delete(`${API_URL}/viajes/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe el viaje con el id:", error);
  }
};

service.getCountViajesActivos = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/viajes/count`);
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
