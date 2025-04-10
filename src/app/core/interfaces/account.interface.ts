export interface Account {
    id: number;
    name: string;
    alias: string;
    created_at: string;
    is_admin: boolean;
    is_coordinator: boolean;
    billing: boolean;
    state: string;
    city: string;
    url_account: string;
  }