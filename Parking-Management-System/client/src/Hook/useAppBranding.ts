import { WEBNAME } from "../Constant";

export const useAppBranding = () => {
  return {
    appName: WEBNAME || "Parking Management System",
    appLogo: "/applogo.jpg",
  };
};
