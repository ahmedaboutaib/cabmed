import { getSalleDattente } from "../api"

export const salleDatttenteStore = (set, get) => ({

    salleDatttentes:[],
    setSalleDattentes: (salleDattentes) => set({ salleDattentes }),
    fetchSalleDattentes: async()=>{
        try {
            const data  = await getSalleDattente(get().cabinet.id);
            get().setSalleDattentes(data);

        } catch (error) {
            console.error(error)
        }
    }

})