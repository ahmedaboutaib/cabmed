import api from './api';

export const getRendezVous = async (CabinetId) => {
  try {
    const response = await api.get(`/rendezvous/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("error fetching rendez vous", error);
  }
};