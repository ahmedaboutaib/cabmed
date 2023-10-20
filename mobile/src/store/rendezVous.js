import { getRendezVous } from "../api"

export const rendezVousStore = (set, get) => ({

    rendezVous: [],
    setRendezVous: (rendezVous) => set({ rendezVous }),
    fetchRendezVous: async()=>{
        try {
            const data  = await getRendezVous(get().cabinet.id);
            get().setRendezVous(data);

        } catch (error) {
            console.error(error)
        }
    }

})