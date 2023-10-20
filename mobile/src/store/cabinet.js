export const cabinetStore = (set) => ({

    cabinet: {},
    setCabinet: (cabinet) => set({ cabinet }),
    getCabinet: async()=>{
        try {
            const userId = userStore.user.userId;
            const response = await fetchCabinet(userId);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
})