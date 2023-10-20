import axios from "axios";

import client from "../../utils/apitoken";

export const createDepense = async (depense) => {
  try {
    const response = await client.post("/depenses", depense);
    return response.data;
  } catch (error) {
    console.error("Error creating depense : ", error);
    throw error;
  }
};

export const fetchDepenses = async () => {
  try {
    const response = await client.get("/depenses");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

export const fetchDepensesCabinetId = async (CabinetId) => {
  try {
    const response = await client.get(`/depenses/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching depences:", error);
    throw error;
  }
};

export const updateDepence = async (Dep) => {
  try {
    const response = await client.put(`/depenses/${Dep.id}}`, Dep);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};
export const deleteDepence = async (id) => {
  try {
    const response = await client.delete(`/depenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};
