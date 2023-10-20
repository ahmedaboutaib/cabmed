import api from './api';

export const getPatients = async (clinicId)=>{
    try {
        const response = await api.get(`/patients/${clinicId}`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}
export const getPatient = async (patientId)=>{
    try {
        const response = await api.get(`/patients/One/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}
export const createPatient = async (patient) => {
    try {
      const response = await api.post("/patients", patient);
      return response.data;
    } catch (error) {
      console.error("Error creating a patient:", error);
      throw error;
    }
};