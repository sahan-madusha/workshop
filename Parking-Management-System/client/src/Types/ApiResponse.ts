export interface ApiError {
  code?: number;
  type?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiError;
  errors?: Record<string, string[]>;
}
