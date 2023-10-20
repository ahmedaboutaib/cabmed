import client from "./apitoken";
// rendez vous
export const fetchRendezVous = async (CabinetId) => {
  try {
    const resp = await client.get(`/rendezvous/${CabinetId}`);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};
export const deleterenderVous = async (id) => {
  try {
    const resp = await client.delete(`/rendezvous/${id}`);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};
export const fetchRendezVousACTUEL = async (rdv) => {
  try {
    const resp = await client.post(`/rendezvous/actuel`, rdv);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};
export const fetchRendezVousMoisACTUEL = async (rdv) => {
  try {
    const resp = await client.post(`/rendezvous/moisactuel`, rdv);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};

export const updateRDV = async (rdv) => {
  try {
    const resp = await client.put(`/rendezvous/${rdv.id}`, rdv);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};
export const fetchRendezVousPaientId = async (PatientId) => {
  try {
    const resp = await client.get(`/rendezvous/patient/${PatientId}`);
    return resp.data;
  } catch (err) {
    console.error("error de fetch rendez vous", err);
  }
};

//salle d'attent
export const fetchSalle = async (CabinetId) => {
  try {
    const resp = await client.get(`/salledattent/${CabinetId}`);
    return resp.data;
  } catch (err) {
    console.error("error de fetch salle", err);
  }
};

export const createSalle = async (salle) => {
  try {
    const resp = await client.post(`/salledattent`, salle);
    return resp.data;
  } catch (err) {
    console.error("error de create  salle", err);
  }
};

export const deleteSalle = async (id) => {
  try {
    const resp = await client.delete(`/salledattent/${id}`);
    return resp.data;
  } catch (err) {
    console.error("error de fetch salle", err);
  }
};

export const updateSalle = async (salle) => {
  try {
    const resp = await client.put(`/salledattent/${salle.id}`, salle);
    return resp.data;
  } catch (err) {
    console.error("error de fetch salle", err);
  }
};
//type Certificat
export const fetchTypeCertificat = async (CabinetId) => {
  try {
    const response = await client.get(`/typecertificat/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("error de fetchTestType", error);
  }
};
//type test

export const createTypetest = async (type) => {
  try {
    const response = await client.post(`/typetest`, type);
    return response.data;
  } catch (error) {
    console.error("error de fetchTestType", error);
  }
};

export const deleteType = async (id) => {
  try {
    const response = await client.delete(`/typetest/${id}`);
    return response.data;
  } catch (error) {
    console.error("error de fetchTestType", error);
  }
};
//type bilan
export const createTypeBilan = async (type) => {
  try {
    const response = await client.post(`/typebilan`, type);
    return response.data;
  } catch (error) {
    console.error("error de typebilan", error);
  }
};

export const deleteTypeBilan = async (id) => {
  try {
    const response = await client.delete(`/typebilan/${id}`);
    return response.data;
  } catch (error) {
    console.error("error delete typebilan", error);
  }
};
// antecidant

export const fetchAntecedent = async (PatientId) => {
  try {
    const response = await client.get(`/antecedent/${PatientId} `);
    return response.data;
  } catch {
    console.error(`Error pour antecedent de patient : `, error);
  }
};
export const createAntecedent = async (antecedent) => {
  try {
    const response = await client.post(`/antecedent`, antecedent);
    return response.data;
  } catch {
    console.error(`Error pour l'antecedent de patient : `, error);
  }
};
export const modifierAntecedent = async (Antecedent) => {
  try {
    const response = await client.put(`/antecedent`, Antecedent);
    return response.data;
  } catch {
    console.error(
      `Error pourla modification l'antecedent de patient : `,
      error
    );
  }
};
export const deleteAntecedent = async (antecedentId) => {
  try {
    const response = await client.delete(`/antecedent/${antecedentId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error pour supprition de  l'antecedent du patient : `,
      error
    );
  }
};
