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