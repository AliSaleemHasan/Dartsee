import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: HttpStatus;
        let clientMessage: string | string[];

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse: any = exception.getResponse();

            clientMessage = exceptionResponse.message || exception.message;

            this.logger.warn(`[${request.method}] ${request.url} - ${status} - ${clientMessage}`);
        }

        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            clientMessage = 'An unexpected internal server error occurred.';

            const realError = exception instanceof Error ? exception.message : String(exception);
            const stackTrace = exception instanceof Error ? exception.stack : 'No stack trace';

            this.logger.error(
                `[${request.method}] ${request.url} - CRITICAL CRASH: ${realError}`,
                stackTrace
            );
        }

        const errorTemplate = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: clientMessage,
        };

        response.status(status).json(errorTemplate);
    }
}