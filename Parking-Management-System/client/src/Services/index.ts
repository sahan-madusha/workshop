import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthCheck, fetchUsersApi, createUserApi, deleteUserApi } from "../Api";

export const useAuthCheckMutation = () => {
  return useMutation({
    mutationFn: async (credentials: any) => {
      return await AuthCheck(credentials);
    },
  });
};

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await fetchUsersApi();
    },
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: any) => {
      return await createUserApi(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteUserApi(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const HARDCODED_NAV_ITEMS = [
  {
    id: "1",
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/system/dashboard_overview",
  },
  {
    id: "2",
    label: "User Management",
    icon: "Users",
    path: "/system/users",
  },
];

export const useUserFeaturesQuery = () => {
  return useQuery({
    queryKey: ["user_features"],
    queryFn: async () => {
      return HARDCODED_NAV_ITEMS;
    },
    staleTime: Infinity,
  });
};

export const useClearRuntimeCacheMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return { success: true, message: "Cache cleared successfully." };
    },
  });
};
