import axios from "axios";
import {API_URL} from '@env'

const api = axios.create({
    baseURL: API_URL, // Replace with your API base URL
});

export const authenticate = async (username,password, email='f')=>{
    try {
        const response = await api.post('/utilisateurAuth/login',{
            nomUtil:username,
            email,
            pwd:password
        });
        return response.data;
    } catch (error) {
        console.error("Error in authenticate:", error);
        console.error(error)
    }
}
