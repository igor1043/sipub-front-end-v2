export interface LampCountData {
  city_hall_quantity: number;
  dealership_quantity: number;
  total: number;
}

export interface LampCountResponse {
  meta: any;
  data: LampCountData;
}
