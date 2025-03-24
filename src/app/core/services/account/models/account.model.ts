export interface AccountResponse {
  meta: {
    error_type: string;
    code: number;
    errors: any[];
    url: string;
    method: string;
    links: any[];
  };
  data: Account[];
}

export interface Account {
  id: number;
  nome: string;
  alias: string;
  created_at: string;
  is_admin: boolean;
  is_coordinator: boolean;
  billing: boolean;
  state: string;
  city: string;
}