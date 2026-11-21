import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const responseBody = {
      success: false,
      error: {
        code: exception instanceof HttpException ? exception.name : 'INTERNAL_SERVER_ERROR',
        message: message,
      },
      requestId: request.headers['x-request-id'] || 'N/A', // In a real app, generate this per request
    };

    response.status(status).json(responseBody);
  }
}
