export interface ModuleGroup {
    id: number;
    title: string;
    sub_title: string;
    alias: string;
    modules: Module[];
  }
  
  export interface Module {
    id: number;
    name: string;
    alias: string;
    module_group: number;
    enable: boolean;
  }