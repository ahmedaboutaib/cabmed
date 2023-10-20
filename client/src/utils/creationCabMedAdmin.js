import axios from "axios";
import api from "./apitoken";


const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createAdminAndCabinet = async (user) => {
  try {
    const response = await client.post("/utilisateur/admin", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    // Handle the response based on the status code
    if (response.status === 409) {
      console.log("sfijqsifjpoisqjfpoijesqofjoisqe", response);
    }

    console.log(response);
    // Return the response data if needed
    return response.data;
  } catch (error) {
    console.log(error.response.status);
    // Handle aother errors
    return error;
  }
};

// avec autorisation

export const createUtilisateur = async (user) => {
  try {
    const response = await api.post("/utilisateur", user);

    console.log(response);
    // Handle the response based on the status code
    if (response.status === 409) {
      console.log("sfijqsifjpoisqjfpoijesqofjoisqe", response);
    }

    console.log(response);
    // Return the response data if needed
    return response.data;
  } catch (error) {
    console.log(error.response.status);
    // Handle aother errors
    return error;
  }
};
export const fetchUserToCab = async (CabinetId) => {
  try {
    const response = await api.get(`/utilisateur/${CabinetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching utilisateur:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/utilisateur/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting utilisateur with ID ${id}:`, error);
    throw error;
  }
};

export const createUtilisateurs = async (user) => {
  try {
    const response = await api.post("/utilisateur", user);
    return response.data;
  } catch (error) {
    console.error("error de user", error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/utilisateur/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("error de user", error);
  }
};

//cbinet
export const createCabmed = async (cabmed) => {
  try {
    const response = await api.post("/cabinet", cabmed, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error de cabent", error);
  }
};
export const fetchCabinet = async (id) => {
  try {
    const response = await api.get(`cabinet/${id}`);
    return response.data;
  } catch (error) {
    console.error("error de cabent", error);
  }
};
export const updateCabinet = async (id, cabinet) => {
  try {
    const response = await api.put(`cabinet/${id}`, cabinet, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error de cabent", error);
  }
};
