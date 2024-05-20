import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDomain } from '../../domain/errors/error-domain';
import { IncidentsService } from '../../../errors/infrastructure/incidents.service';
import { UUIDService } from '../services/uuid.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly incidentsService: IncidentsService,
    private readonly uuidService: UUIDService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message =
      'No se logro procesar la solicitud, comunicar al administrador';
    let error = 'Internal Server Error';

    if (
      (status !== 500 && exception instanceof HttpException) ||
      exception instanceof ErrorDomain
    ) {
      status = exception.getStatus();
      message = exception.message;
      if (typeof exception.getResponse() === 'object') {
        message = (exception.getResponse() as { message: string }).message;
        error = (exception.getResponse() as { error: string }).error;
      }
    } else if (exception?.code === 11000) {
      message = `Ya existe un registró para este elemento`;
      status = 400;
      error = exception?.message;
    }

    if (status === 500) {
      console.log(exception);
      this.incidentsService.create({
        id: this.uuidService.generate(),
        name: request.url,
        error: exception.toString(),
        body: JSON.stringify(request.body),
      });
    }

    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error,
    });
  }
}
