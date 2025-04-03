export interface User {
    token: string;
    username: string;
    id_user: number;
    id_person: number;
    role_name: string;
    is_admin_account: boolean;
    is_admin: boolean;
    is_coordinator: boolean;
    has_account_access: boolean;
  }