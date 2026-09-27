import { apiClient } from "./client";

export const loginApi = async (credentials: any) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};
