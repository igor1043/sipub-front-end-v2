import { ModuleGroup } from "./module.model";

export interface Account {
    alias: string;
    state: string;
    city: string;
    id_account: number;
    module_groups: ModuleGroup[];
  }