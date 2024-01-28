import { UUID } from '../../../common/application/services/uuid';
import { PermissionRepository } from '../../../permissions/domain/permission.repository';
import { PermissionFactory } from '../../../permissions/domain/permission.factory';
import { SeederPermissionsResponse } from '../response/seeder-permissions.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
import { PermissionResponse } from '../../../permissions/application/response/permission.response';
import { Uuid } from '../../../common/domain/value-object/uuid';

export class PermissionSeeder {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly uuid: UUID,
  ) {}

  async execute(): Promise<SeederPermissionsResponse> {
    const permissionCreate = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'crear',
      description: 'Crear nuevos elementos',
      group: 'contratos',
    });
    const permissionEdit = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'editar',
      description: 'Crear nuevos elementos',
      group: 'contratos',
    });
    const permissionDelete = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Eliminar',
      description: 'Crear nuevos elementos',
      group: 'contratos',
    });
    const permissionView = PermissionFactory.create({
      id: this.uuid.generate(),
      name: 'Visualizar',
      description: 'Crear nuevos elementos',
      group: 'contratos',
    });

    await this.isInitProject();

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

  async isInitProject(): Promise<void> {
    const criteria = CriteriaFactory.fromData({
      start: 0,
      sorting: [],
      filters: [],
      globalFilter: '',
      globalFilterProperties: [],
      size: 100,
      selectProperties: [],
    });
    const response =
      await this.permissionRepository.search<PermissionResponse>(criteria);
    await Promise.all(
      response.rows.map((r) =>
        this.permissionRepository.remove(new Uuid(r.id)),
      ),
    );
  }
}
