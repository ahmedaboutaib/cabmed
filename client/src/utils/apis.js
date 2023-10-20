// un example pour nous aider a organiser notre code
// le contenue de api.js doit inclure les fonctions qui interagis avec notre server
import axios from "axios";
import client from "./apitoken";

/*
const API_BASE_URL = "/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});*/

export const fetchPatients = async () => {
  try {
    const response = await client.get(`/patients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};
export const fetchOnePatient = async (id) => {
  try {
    const response = await client.get(`/patients/One/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};
export const fetchPatientsIdCab = async (CabinetId) => {
  try {
    const response = await client.get(`/patients/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};
export const fetchPatient = async (patientId) => {
  try {
    const response = await client.get(`/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${patientId}:`, error);
    throw error;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await client.post("/patients", patientData);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const updatePatient = async (patientId, patientData) => {
  try {
    const response = await client.put(`/patients/${patientId}`, patientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${patientId}:`, error);
    throw error;
  }
};

export const deletePatient = async (patientId) => {
  try {
    const response = await client.delete(`/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting patient with ID ${patientId}:`, error);
    throw error;
  }
};

export const updateStatusPatient = async (patientId) => {
  try {
    const response = await client.put(`/patients/status/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating status patient with ID ${patientId}:`, error);
    throw error;
  }
};
//rechercher par nom
export const rechercherPatient = async (rechercher) => {
  try {
    const response = await client.post(`/patients/rchercher/${rechercher}`);
    return response.data;
  } catch {
    console.error("Error creating patient:", error);
    throw error;
  }
};

//rendervous
export const createRendezVous = async (RendezVousData) => {
  try {
    const response = await client.post("/rendezvous", RendezVousData);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const ModiferRendezVous = async (RendezVousData) => {
  try {
    const response = await client.put(
      `/rendezvous/${RendezVousData.id}`,
      RendezVousData
    );
    return response.data;
  } catch (error) {
    console.error("Error update patient:", error);
    throw error;
  }
};

//login
export const userLogin = async (user) => {
  try {
    const response = await client.post("/utilisateur/login", user);
    return response.data;
  } catch (error) {
    console.error("Error login :", error);
    throw error;
  }
};
