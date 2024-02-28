import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JWT } from '../../application/services/jwt';

@Injectable()
export class JWTAdapterService implements JWT {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  createOneTimeToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
