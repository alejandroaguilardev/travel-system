import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class SwaggerAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
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
