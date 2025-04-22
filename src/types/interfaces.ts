export interface ErrorResponse {
  data: {
    error: string;
    message: string;  
    statusCode: number;
  };
  status: number;
}

export interface ICarFormData {
  vin: string;
  brand: string;
  model: string;
  color: string;
  plateNumber: string;
  year: string;
}
export interface ICar extends ICarFormData {
  id: string;
}