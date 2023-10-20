import api from './api';


export const getUsers = async (clinicId)=>{
    try {
        const response = await api.get();
        return response.data;
    } catch (error) {
        console.error(error)
    }
}
export const getUser = async (clinicId, userId)=>{
    try {
        const response = await api.get();
        return response.data;
    } catch (error) {
        console.error(error)
    }
}