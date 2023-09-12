import { IResponse } from '../interfaces/IResponse';

export class ResponseError implements IResponse {
  constructor(infoMessage: string, data?: any) {
    this.success = false;
    this.message = infoMessage;
    this.data = data;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        infoMessage +
        (data ? ' - ' + JSON.stringify(data) : ''),
    );
  }
  message: string;
  data: any[];
  errorMessage: any;
  error: any;
  success: boolean;
}
