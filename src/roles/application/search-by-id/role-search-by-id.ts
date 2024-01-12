import { Uuid } from '../../../common/domain/value-object/uuid';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';
import { RoleRepository } from '../../domain/role.repository';
import { RoleResponse } from '../response/role.response';

export class RoleSearchById {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleResponse> {
    const uuid = new Uuid(id);
    const response = await this.roleRepository.searchById<RoleResponse>(uuid);

    if (!response) {
      throw new InvalidArgumentError(
        'Rol no encontrado: El sistema no pudo hallar el permiso especificado',
        400,
        'not_found',
      );
    }

    return response;
  }
}
