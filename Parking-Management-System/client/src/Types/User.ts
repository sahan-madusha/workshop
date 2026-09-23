export interface User {
  id: number;
  username: string;
  email: string;
  role_id: number;
  role_name: string;
  employee_id: number | null;
  employee_first_name: string | null;
  employee_last_name: string | null;
  employee_nic: string | null;
  status: "Active" | "Inactive";
  created_at: string;
  store_id: string;
  store_name: string;
  store_main_store?: number;
}

export interface EmployeeOption {
  id: number;
  first_name: string;
  last_name: string;
  nic: string | null;
  phone: string | null;
}

export interface RoleOption {
  id: number;
  name: string;
  description: string | null;
}
