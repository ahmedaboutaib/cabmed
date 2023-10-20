/*import axios from "axios";
import Consultation from "../pages/dashboard/dossiersmedicaux/Consultation";

const API_BASE_URL = "/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
*/

import client from "./apitoken";

export const fetchExamenPhysique = async (PatientId) => {
  try {
    const response = await client.get(`/examenphysique/${PatientId}`);
    return response.data;
  } catch {
    console.error(
      `Error pour examinphysique de patient ${PatientId} : `,
      error
    );
  }
};
export const creatExamenPhysique = async (emph) => {
  try {
    const response = await client.post("/examenphysique", emph);
    return response.data;
  } catch (error) {
    console.error("error de la creation de l'examen physique", error);
  }
};
export const modifierExamenPhysique = async (id, emph) => {
  try {
    const response = await client.put(`/examenphysique/${id}`, emph);
  } catch (error) {
    console.error("error de me dification de l'examen physique");
  }
};

export const fetchConsultaion = async (PatientId) => {
  try {
    const response = await client.get(`/consultation/${PatientId} `);
    return response.data;
  } catch {
    console.error(`Error pour consultaion de patient : `, error);
  }
};
export const createConsultation = async (Consultaion) => {
  try {
    const response = await client.post(`/consultation`, Consultaion);
    return response.data;
  } catch {
    console.error(`Error pour consultaion de patient : `, error);
  }
};
export const modifierConsultation = async (Consultation) => {
  try {
    const response = await client.put(`/consultation`, Consultation);
    return response.data;
  } catch {
    console.error(
      `Error pourla modification  consultaion de patient : `,
      error
    );
  }
};
export const deleteConsultation = async (consultaionId) => {
  try {
    const response = await client.delete(`/consultation/${consultaionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error pour supprition de  consultaion de patient : `, error);
  }
};

export const fetchOrdonnance = async (PatientId) => {
  try {
    const response = await client.get(`/ordonnance/${PatientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error pour error d'ordonnance de patient : `, error);
  }
};
export const fetchMedicament = async (CabinetId) => {
  try {
    const response = await client.get(`/medicament/${CabinetId}`);
    return response.data;
  } catch {
    console.error(`Error pour error d'ordonnance de patient : `, error);
  }
};

export const createMedicament = async (med) => {
  try {
    const response = await client.post(`/medicament`, med);
    return response.data;
  } catch {
    console.error(`Error pour Ordonnance de patient : `, error);
  }
};
export const deleteMedicament = async (id) => {
  try {
    const response = await client.delete(`/medicament/${id}`);
    return response.data;
  } catch {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};
export const createOrdonnance = async (Ordonnance) => {
  try {
    const response = await client.post(`/ordonnance`, Ordonnance);
    return response.data;
  } catch {
    console.error(`Error pour Ordonnance de patient : `, error);
  }
};
export const createPreinscription = async (preinscre) => {
  try {
    const response = await client.post(`/prescription/`, preinscre);
    return response.data;
  } catch {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};
export const createPreinscriptionUp = async (id, preinscre) => {
  try {
    const response = await client.post(`/prescription/up/${id}`, preinscre);
    return response.data;
  } catch {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};
/*
export const createPreinscriptionUp = async (preinscre) => {
  try {
    const response = await client.post(`/prescription/up`, preinscre);
    return response.data;
  } catch {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};*/
export const deleteOrdonnance = async (id) => {
  try {
    const response = await client.delete(`/ordonnance/${id}`);
    return response.data;
  } catch {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};

export const deletePreiscription = async (prescription) => {
  try {
    const response = await client.delete(`/prescription/`, prescription);
    return response.data;
  } catch (error) {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};
export const deletePreiscriptions = async (prescription) => {
  try {
    const response = await client.post(`/prescription/delete`, prescription);
    return response.data;
  } catch (error) {
    console.error(
      `Error pour la Preinscription de Ordonnance de patient : `,
      error
    );
  }
};

export const fetchCertaficat = async (PatientId) => {
  try {
    const response = await client.get(`/certificat/${PatientId} `);
    return response.data;
  } catch {
    console.error(`Error pour certificat de patient : `, error);
  }
};

export const createcertificat = async (certificat) => {
  try {
    const response = await client.post(`/certificat`, certificat);
    return response.data;
  } catch {
    console.error(`Error pour consultaion de patient : `, error);
  }
};

export const deletCertificat = async (id) => {
  try {
    const response = await client.delete(`/certificat/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error pour supprition de  la certificat de patient : `,
      error
    );
  }
};

export const updatecertificat = async (certificat) => {
  try {
    const response = await client.put(`/certificat`, certificat);
    return response.data;
  } catch {
    console.error(
      `Error pour la modification  certificat de patient : `,
      error
    );
  }
};

export const fetchTestMed = async (PatientId) => {
  try {
    const response = await client.get(`/testMedical/${PatientId}`);
    return response.data;
  } catch {
    console.error(`Error pour test medical  de patient : `, error);
  }
};
export const fetchTypeTest = async (CabinetId) => {
  try {
    const response = await client.get(`/TypeTest/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("error de fetchTestType", error);
  }
};
export const createTestMed = async (TestMed) => {
  try {
    const response = await client.post("/testMedical ", TestMed, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error de la creation de testMed", error);
  }
};

export const deletetestMed = async (id) => {
  try {
    const response = await client.delete(`/testMedical/${id}`);
    return response;
  } catch (error) {
    console.error("error de supprition de test", error);
  }
};
export const updateTestMed = async (id, tsetMed) => {
  try {
    const response = await client.put(`/testMedical/${id}`, tsetMed, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error de modification de test medical");
  }
};
// service
export const fetchService = async (CabinetId) => {
  try {
    const response = await client.get(`/service/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

export const ajouterService = async (services) => {
  try {
    const resp = await client.post("/service", services);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};
export const deleteService = async (id) => {
  try {
    const response = await client.delete(`/service/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};

export const modifierService = async (service) => {
  try {
    const resp = await client.put("/service", service);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

//paiement
export const fetchPaiement = async (PatientId) => {
  try {
    const response = await client.get(`/paiement/${PatientId} `);
    return response.data;
  } catch (err) {
    console.error("error fetch paiement", err);
  }
};

export const createPaiement = async (paiment) => {
  try {
    const response = await client.post("/paiement", paiment);
    return response.data;
  } catch (err) {
    console.error("error de creation de paiement", err);
  }
};

export const createVisites = async (vist) => {
  try {
    const response = await client.post("/visite", vist);
    return response.data;
  } catch (err) {
    console.error("error de creation de visite", err);
  }
};

export const updatePaiement = async (paiement) => {
  try {
    const resp = await client.put("/paiement/visite", paiement);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification paiement");
  }
};
export const updateVisites = async (visite) => {
  try {
    const resp = await client.put("/visite", visite);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification paiement");
  }
};
export const deletePaiement = async (id) => {
  try {
    const resp = await client.delete(`/paiement/${id}`);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification paiement");
  }
};
export const fetchPaiementIMpaye = async (CabinetId) => {
  try {
    const resp = await client.get(`paiement/impaye/${CabinetId}`);
    return resp.data;
  } catch (err) {
    console.error("eroore de fetch  paiement");
  }
};

export const updatePaiementpaye = async (paiement) => {
  try {
    const resp = await client.put("/paiement", paiement);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification paiement");
  }
};
//bilan
export const fetchTypeBilan = async (CabinetId) => {
  try {
    const response = await client.get(`/typebilan/${CabinetId}`);
    return response.data;
  } catch (err) {
    console.error("error fetch type bilan", err);
  }
};

export const createBilan = async (bilan) => {
  try {
    const response = await client.post("/bilan", bilan);
    return response.data;
  } catch (err) {
    console.error("error de creation de bilan", err);
  }
};

export const fetchBilan = async (PatientId) => {
  try {
    const response = await client.get(`/bilan/${PatientId}`);
    return response.data;
  } catch (err) {
    console.error("error fetch  bilan", err);
  }
};

export const deleteBilan = async (id) => {
  try {
    const response = await client.delete(`/bilan/${id}`);
    return response.data;
  } catch (err) {
    console.error("error delet  bilan", err);
  }
};
export const updateBilan = async (id, bilan) => {
  try {
    const resp = await client.put(`/bilan/${id}`, bilan);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification bilan");
  }
};

export const chargerResultat = async (id, bilan) => {
  try {
    const resp = await client.put(`/bilan/charger/${id}`, bilan);
    return resp.data;
  } catch (err) {
    console.error("eroore de modification bilan");
  }
};
