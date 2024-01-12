import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../../application/services/jwt';

@Injectable()
export class JWTAdapterService implements JWT {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
