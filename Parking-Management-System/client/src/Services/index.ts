import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthCheck } from "../Api";

export const useAuthCheckMutation = () => {
  return useMutation({
    mutationFn: async (credentials: any) => {
      return await AuthCheck(credentials);
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
