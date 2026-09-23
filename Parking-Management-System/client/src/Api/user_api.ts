import { axiosClientv1 } from "./apiClient";
import { ApiResponse } from "../Types";

export const AuthCheck = async (formData: any): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosClientv1.post(`/login`, formData);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Invalid username or password.",
      error: {
        code: error?.response?.status || 401,
        type: "unauthorized",
      },
    };
  }
};