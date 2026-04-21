export interface IResponseSuccess<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}
export interface IResponseError {
  success: boolean;
  message: string;
  error: any;
}
