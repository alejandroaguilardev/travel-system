import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../application/services/jwt';
import { UserMongoRepository } from '../../../users/infrastructure/persistence/user-mongo.repository';
import { JwtStrategy } from '../../application/services/jwt-strategy';
import { UserWithoutResponse } from '../../../users/application/response/user-without.response';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserMongoRepository,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<UserWithoutResponse> {
    const jwtStrategy = new JwtStrategy(this.userRepository);
    return await jwtStrategy.validate(payload);
  }
}
