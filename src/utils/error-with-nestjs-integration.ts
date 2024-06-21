import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ServerError } from './custom-error-classes';
import { ErrorManager } from './enhanced-error-manager';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly errorHandler: ErrorManager) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';
    let errorResponse = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      if (exception instanceof BadRequestException) {
        const response = exception.getResponse();
        if (typeof response === 'object' && response['message']) {
          errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: response['message'],
          };
        } else {
          errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: response,
          };
        }
      } else {
        errorResponse = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,
          //message: {
          //  message: exception.message,
          //  data: plainToInstance(AuthRegisterI, exception.getResponse()),
          //},
        };
      }
    }

    if (status === 500) {
      console.log(exception);
      this.errorHandler.handleError(
        'Global',
        new ServerError(message, { request }),
      );
    }

    response.status(status).json(errorResponse);
  }
}
