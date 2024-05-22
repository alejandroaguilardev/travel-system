import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SwaggerAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !this.validateToken(authHeader)) {
      throw new UnauthorizedException(
        'You do not have access to this resource',
      );
    }

    return true;
  }

  validateToken(authHeader: string): boolean {
    const token = authHeader.split(' ')[1]; // Suponiendo un esquema "Bearer token"
    return token === 'your-secret-token';
  }
}
