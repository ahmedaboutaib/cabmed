import api from './api';

export const getSalleDattente = async (CabinetId) => {
  try {
    const response = await api.get(`/salledattent/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("error fetching salledattente", error);
  }
};