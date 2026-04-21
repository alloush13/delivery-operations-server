export interface AuthStrategy {
  register(data: any): Promise<any>;
  login(data: any): Promise<any>;
}