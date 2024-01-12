import { UUID } from '../../../common/application/services/uuid';
import { PermissionRepository } from '../../../permissions/domain/permission.repository';
import { PermissionFactory } from '../../../permissions/domain/permission.factory';
import { SeederPermissionsResponse } from '../response/seeder-permissions.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';

export class PermissionSeeder {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly uuid: UUID,
  ) {}

  async execute(): Promise<SeederPermissionsResponse> {
    const permissionCreate = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Crear',
      description: 'Crear nuevos elementos',
    });
    const permissionEdit = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Editar',
      description: 'Crear nuevos elementos',
    });
    const permissionDelete = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Eliminar',
      description: 'Crear nuevos elementos',
    });
    const permissionView = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Visualizar',
      description: 'Crear nuevos elementos',
    });

    await Promise.all([
      this.permissionRepository.save(permissionCreate),
      this.permissionRepository.save(permissionEdit),
      this.permissionRepository.save(permissionDelete),
      this.permissionRepository.save(permissionView),
    ]);
    return {
      create: permissionCreate.id.value,
      edit: permissionEdit.id.value,
      delete: permissionDelete.id.value,
      view: permissionView.id.value,
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
    const response = await this.permissionRepository.search(criteria);
    return response.count > 0;
  }
}
