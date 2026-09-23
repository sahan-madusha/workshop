import config from "./config";

export const WEBNAME = config.webName;
export const MIN_PASSWORD_LENGTH = 6;
export const SERVER_API = config.serverapi;
export const UNAUTHORIZED_EVENT = "unauthorized_access";

export const ROUTE = {
  login: config.login,
  loginSuccess: config.loginSuccess,
  dashboard_overview: config.dashboard_overview,
};

export const REPORT = {
  sales_ledger: "reports/sales-ledger",
};
