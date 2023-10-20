import { getPatient, getPatients } from "../api/patient"

export const patientStore = (set, get) => ({

    patient: {},
    patients:[],
    setPatients: (patients) => set({ patients }),
    setPatient: (patient) => set({ patient }),
    fetchPatient: async(paientId)=>{
        try {
            const data = await getPatient(paientId);
            get().setPatient(data);
        } catch (error) {
            console.error(error)
        }
    },
    fetchPatients: async()=>{
        try {
            const data  = await getPatients(get().cabinet.id);
            get().setPatients(data);

        } catch (error) {
            console.error(error)
        }
    }

})