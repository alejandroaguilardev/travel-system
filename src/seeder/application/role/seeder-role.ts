import { UUID } from '../../../common/application/services/uuid';
import { RoleRepository } from '../../../roles/domain/role.repository';
import { RoleFactory } from '../../../roles/domain/role.factory';
import { SeederRoleResponse } from '../response/seeder-role.response';
import { SeederPermissionsResponse } from '../response/seeder-permissions.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
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
    await this.isInitProject();
    await Promise.all([
      this.roleRepository.save(roleAdmin),
      this.roleRepository.save(roleClient),
    ]);

    return {
      admin: roleAdmin.id.value,
      client: roleClient.id.value,
    };
  }

  async isInitProject(): Promise<void> {
    const criteria = CriteriaFactory.fromData({
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
