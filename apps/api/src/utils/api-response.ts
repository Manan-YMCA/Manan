export default class ApiResponse<T = unknown> {
  statusCode: number;
  success: true;
  message: string;
  data: T;

  constructor(statusCode: number, data: T, message = "Success") {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
