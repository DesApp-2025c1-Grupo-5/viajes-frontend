import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;
console.log(API_URL);

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/vehiculos`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
};

service.post = async (nuevoVehiculo) => {
  try {
    const respuesta = await axios.post(`${API_URL}/vehiculos`, nuevoVehiculo);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo vehículo:", error);
  }
};

service.getVehiculoById = async (id) => {
  try {
    const respuesta = await axios.get(`${API_URL}/vehiculos/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe vehículo con el id:", error);
  }
};

service.updateVehiculo = async (id, vehiculo) => {
  try {
    const respuesta = await axios.put(`${API_URL}/vehiculos/${id}`, vehiculo);
    return respuesta.data;
  } catch (error) {
    console.error("No existe vehículo con el id:", error);
  }
};

service.deleteVehiculo = async (id) => {
  try {
    const respuesta = await axios.delete(`${API_URL}/vehiculos/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe vehículo con el id:", error);
  }
};

export default service;
