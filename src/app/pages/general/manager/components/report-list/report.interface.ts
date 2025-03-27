export interface ReportGroup {
    title: string;
    subItems: ReportSubItem[];
  }
  
  export interface ReportSubItem {
    id: number;
    name: string;
    formConfig: FormField[];
  }
  
  export interface FormField {
    type: 'text' | 'number' | 'date' | 'select' | 'month';
    label: string;
    key: string;
    required?: boolean;
    options?: string[];
    defaultValue?: any;
  }