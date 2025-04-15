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

  export function mapBeAccountToAccount(beAccount: any): Account {
    return {
      id: beAccount.id,
      name: beAccount.nome, 
      alias: beAccount.alias,
      created_at: beAccount.created_at,
      is_admin: beAccount.is_admin,
      is_coordinator: beAccount.is_coordinator,
      billing: beAccount.billing,
      state: beAccount.state,
      city: beAccount.city,
      url_account: beAccount.url_account || '' 
    };
  }