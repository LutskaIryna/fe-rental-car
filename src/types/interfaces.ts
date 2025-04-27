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

export interface IRentalFormData {
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface IRental extends IRentalFormData {
  id: string;
  car: ICar;
}