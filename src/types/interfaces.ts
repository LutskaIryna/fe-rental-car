export interface ErrorResponse {
  data: {
    error: string;
    message: string;  
    statusCode: number;
  };
  status: number;
}