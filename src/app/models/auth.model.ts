export interface AuthResponse {
    token: string;
    username: string;
    account_name: string;
    alias: string;
    id_user: number;
    module: number[];
    billing: number;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
    id_api: string;
  }
  