const appVersion = "1.0.0";
const baseDomain = process.env.REACT_APP_BASE_DOMAIN || "http://localhost:8000";

const commonConfig = {
  webName: "Parking Management System",
  address: "",
  mobile: "",
  email: "",
  whatsapp: "",
  noImage: "no_image_available.jpg",
};

const config = {
  ...commonConfig,
  webLink: baseDomain,
  server: baseDomain,
  serverapi: `${baseDomain}/api`,

  // Web routes
  login: "/",
  loginSuccess: "login-success",
  dashboard_overview: "dashboard_overview",

  appLogo: "applogo.jpg",
  signInBg: "signInBg.jpeg",
  appVersion: appVersion,
};

export const getHiddenFeatureCodes = (_config?: any): string[] => {
  return [];
};

export default config;
