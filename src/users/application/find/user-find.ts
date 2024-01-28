import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserRepository } from '../../domain/user.repository';
import { UserWithoutResponse } from '../response/user-without.response';

export class UserFind {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: string): Promise<UserWithoutResponse> {
    const uuid = new Uuid(id);
    const user = await this.userRepository.searchByIdWithRole(uuid);
    if (user === null) return null;
    return user;
  }
}
