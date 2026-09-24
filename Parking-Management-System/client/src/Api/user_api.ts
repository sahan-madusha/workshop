import { axiosClientv1 } from "./apiClient";
import { ApiResponse } from "../Types";

export const AuthCheck = async (formData: { username: string; password: string }): Promise<ApiResponse<any>> => {
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

export const fetchUsersApi = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosClientv1.get(`/users`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch users.",
      data: [],
    };
  }
};

export const createUserApi = async (userData: {
  username: string;
  password: string;
  employee_id?: number | null;
  user_role_id?: number | null;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosClientv1.post(`/users`, userData);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to create user.",
    };
  }
};

export const deleteUserApi = async (id: number): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosClientv1.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to delete user.",
    };
  }
};