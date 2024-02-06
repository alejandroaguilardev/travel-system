import { UUID } from '../../../common/application/services/uuid';
import { RoleRepository } from '../../../roles/domain/role.repository';
import { RoleFactory } from '../../../roles/domain/role.factory';
import { SeederRoleResponse } from '../response/seeder-role.response';
import { SeederPermissionsResponse } from '../response/seeder-permissions.response';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { RoleResponse } from '../../../roles/application/response/role.response';

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

    await this.isInitProject();
    await Promise.all([this.roleRepository.save(roleAdmin)]);

    return {
      admin: roleAdmin.id.value,
    };
  }

  async isInitProject(): Promise<void> {
    const criteria = CommandCriteria.fromData({
      start: 0,
      sorting: [],
      filters: [],
      globalFilter: '',
      globalFilterProperties: [],
      size: 10,
      selectProperties: [],
    });
    const response = await this.roleRepository.search<RoleResponse>(criteria);
    await Promise.all(
      response.rows.map((r) => this.roleRepository.remove(new Uuid(r.id))),
    );
  }
}
