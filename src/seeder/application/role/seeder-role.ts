import { UUID } from '../../../common/application/services/uuid';
import { RoleRepository } from '../../../roles/domain/role.repository';
import { RoleFactory } from '../../../roles/domain/role.factory';
import { SeederRoleResponse } from '../response/seeder-role.response';
import { SeederPermissionsResponse } from '../response/seeder-permissions.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';

export class RoleSeeder {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly uuid: UUID,
  ) {}

  async execute(
    permissions: SeederPermissionsResponse,
  ): Promise<SeederRoleResponse> {
    const roleAdmin = RoleFactory.create({
      id: this.uuid.generate(),
      name: 'administrador',
      description: 'Todos los permisos del sistema',
      permissions: [
        permissions.create,
        permissions.edit,
        permissions.delete,
        permissions.view,
      ],
    });
    const roleClient = RoleFactory.create({
      id: this.uuid.generate(),
      name: 'cliente',
      description: 'Panel del cliente',
      permissions: [
        permissions.create,
        permissions.edit,
        permissions.delete,
        permissions.view,
      ],
    });
    console.log({ roleClient });

    await Promise.all([
      this.roleRepository.save(roleAdmin),
      this.roleRepository.save(roleClient),
    ]);

    return {
      admin: roleAdmin.id.value,
      client: roleClient.id.value,
    };
  }

  async isInitProject(): Promise<boolean> {
    const criteria = CriteriaFactory.fromData({
      start: 0,
      sorting: [],
      filters: [],
      globalFilter: '',
      globalFilterProperties: [],
      size: 10,
      selectProperties: [],
    });
    const response = await this.roleRepository.search(criteria);
    return response.count > 0;
  }
}
