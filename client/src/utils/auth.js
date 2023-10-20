import axios from "axios";
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userLogin = async (user) => {
  try {
    const response = await client.post("/utilisateurAuth/login", user);
    return response.data;
  } catch (error) {
    console.error("Error login :", error);
    throw error;
  }
};
