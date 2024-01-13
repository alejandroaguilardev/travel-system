import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../../users/domain/user.repository';
import { JwtPayload } from './jwt';
import { UserResponse } from '../../../users/application/response/user.response';

export class JwtStrategy {
  constructor(private userRepository: UserRepository) {}

  async validate(payload: JwtPayload): Promise<UserResponse> {
    const { id } = payload;
    const uuid = new Uuid(id);
    const user = await this.userRepository.searchById<UserResponse>(uuid);
    if (!user) throw new ErrorBadRequest('Token no Válido');
    delete user.password;
    return user;
  }
}
