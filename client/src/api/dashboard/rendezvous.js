import axios from "axios";
const API_BASE_URL = "/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRendezVous = async () => {
  const response = await client.get("/rendezvous");
  console.log(response.data)
  return response.data;
};

export const removeRendezVous = async (event) => {
  try {
    await client.delete(`/rendezvous/${event.id}`);
    return true;
  } catch (error) {
    console.error("Error removing event:", error);
    return false;
  }
};

export const modifyRendezVous = async (event) => {
  try {
    await client.put(`/rendezvous/${event.id}`, event);
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    return false;
  }
};