export interface AuthResponse {
  meta: {
    error_type: string;
    code: number;
    errors: any[];
    url: string;
    method: string;
    links: any[];
  };
  data: {
    token: string;
    username: string;
    account_name: string;
    alias: string;
    state?: string;
    city?: string;
    billing: number;
    id_user: number;
    module: number[];
    account_access: any[];
    acl?: { // Campo opcional
      id_account?: number;
      is_admin_account?: boolean;
      is_admin?: boolean;
      is_coordinator?: boolean;
      has_account_access?: boolean;
      privileges?: Record<string, any>;
      role_name?: string;
    };
    module_groups?: { // Campo opcional
      id: number;
      title: string;
      sub_title: string;
      alias: string;
      modules: {
        id: number;
        name: string;
        alias: string;
        module_group: number;
        enable: boolean;
      }[];
    }[] | null; // Pode ser um array ou null
  };
}

export interface LoginRequest {
  username: string;
  password: string;
  id_api: string;
  acl?: boolean; 
  module_description?: boolean; 
}