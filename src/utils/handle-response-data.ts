import { HttpStatus } from '@nestjs/common';

export class ResponseData<T = any> {
  status: boolean;
  statusCode: HttpStatus;
  message: string;
  data: T | null;
  errorMessage?: string;
}

export const ResponseSuccess = (
  code: number,
  mess: string,
  data,
): ResponseData => {
  return {
    status: true,
    statusCode: code,
    message: mess,
    data: data,
  };
};

export const ResponseError = (
  code: number,
  mess: string,
  error: string,
): ResponseData => {
  return {
    status: false,
    statusCode: code,
    message: mess,
    data: null,
    errorMessage: error,
  };
};
