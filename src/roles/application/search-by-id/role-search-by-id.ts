import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { RoleRepository } from '../../domain/role.repository';
import { RoleResponse } from '../response/role.response';

export class RoleSearchById {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleResponse> {
    const uuid = new Uuid(id);
    const response = await this.roleRepository.searchById<RoleResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('rol'));
    }

    return response;
  }
}
