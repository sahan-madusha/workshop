const toBool = (v: string | undefined): boolean => {
  if (!v) return false;
  return v === "1" || v === "true";
};

const toNumber = (v: string | undefined): number => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

const toString = (v: string | undefined): string => v ?? "";

export const SYSTEM_CONFIG_REGISTRY = [
  {
    key: "app_name",
    label: "Application Name",
    description: "Name displayed in browser title and login page",
    category: "branding",
    defaultValue: "Parking Management System",
    parse: toString,
    isPublic: true,
  },
  {
    key: "app_logo",
    label: "Application Logo",
    description: "Logo filename in /images folder (e.g., applogo.jpg)",
    category: "branding",
    defaultValue: "applogo.jpg",
    parse: toString,
    isPublic: true,
  },
  {
    key: "store_name",
    label: "Facility Name",
    description: "Business name printed on receipts and invoices",
    category: "branding",
    defaultValue: "Parking Management System",
    parse: toString,
    isPublic: true,
  },
  {
    key: "address",
    label: "Facility Address",
    description: "Physical address printed on receipts",
    category: "branding",
    defaultValue: "",
    parse: toString,
    isPublic: true,
  },
  {
    key: "currency",
    label: "Currency Code",
    description: "ISO currency code for transactions (e.g., LKR, USD)",
    category: "financial",
    defaultValue: "USD",
    parse: toString,
    isPublic: true,
  },
];

export const getConfigDefinition = (key: string) =>
  SYSTEM_CONFIG_REGISTRY.find((f: any) => f.key === key);

export const getConfigByCategory = (category: string) =>
  SYSTEM_CONFIG_REGISTRY.filter((f: any) => f.category === category);

export const getPublicConfigKeys = () =>
  SYSTEM_CONFIG_REGISTRY.filter((f: any) => f.isPublic).map((f: any) => f.key);
