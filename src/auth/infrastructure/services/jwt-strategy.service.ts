import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../application/services/jwt';
import { UserMongoRepository } from '../../../users/infrastructure/persistence/user-mongo.repository';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';

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
  async validate(payload: JwtPayload): Promise<UserWithoutWithRoleResponse> {
    const { id } = payload;
    const uuid = new Uuid(id);
    const user = await this.userRepository.searchByIdWithRole(uuid);
    if (!user) throw new ErrorBadRequest('Token no Válido');
    delete user.password;
    return user;
  }
}
