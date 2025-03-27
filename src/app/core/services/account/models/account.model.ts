import { Account } from "app/core/interfaces/account.interface";

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