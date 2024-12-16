import axios from "axios";

export const api = axios.create({
  baseURL: "https://post-office-api.onrender.com/api/consignment",
});

export const getConsignmentsByQuery = async (query: string) => {
  try {
    if (!query.trim()) return [];

    const response = await api.get(`/search/${query}`);

    if (response.data.length == null) "No consignments found";

    return response.data;
  } catch (error) {
    console.error("Error fetching consignments by query:", error);
    throw error;
  }
};

export const addConsignments = async (consignment: any) => {
  try {
    console.log("consignment", consignment);

    const response = await api.post("/add", consignment);
    return response.data;
  } catch (error) {
    console.error("Error adding consignment:", error);
    throw error;
  }
};

export const getConsignments = async () => {
  try {
    const response = await api.get("/fetch-all");

    return response.data;
  } catch (error) {
    console.error("Error fetching consignments:", error);
    throw error;
  }
};

export const deleteConsignments = async (id: string) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting consignment:", error);
    throw error;
  }
};

export const updateConsignments = async (id: string, consignment: any) => {
  try {
    const response = await api.put(`/update/${id}`, consignment);
    return response.data;
  } catch (error) {
    console.error("Error updating consignment:", error);
    throw error;
  }
};
