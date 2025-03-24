export interface Meta {
  error_type: string;
  code: number;
  errors: string[];
  url: string;
  method: string;
  links: any[]; 
}

export interface ConfigurationPayload {
  key: string;
  signed_url: string;
}

export interface AccountConfigurationData {
  message: string;
  payload: ConfigurationPayload[];
}

export interface AccountConfigurationResponse {
  meta: Meta;
  data: AccountConfigurationData;
}