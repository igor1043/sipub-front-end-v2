export interface UserPhotoResponse {
  meta: {
    error_type: string;
    code: number;
    errors: any[];
    url: string;
    method: string;
    links: any[];
  };
  data: {
    message: string;
    name: string;
    link: string;
  };
}