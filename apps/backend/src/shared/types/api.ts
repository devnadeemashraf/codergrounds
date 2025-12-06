export interface ApiErrorObject {
  message: string;
  field?: string;
}
export interface ApiMetaObject {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ApiErrorObject[];
  meta?: Partial<ApiMetaObject>;
}
