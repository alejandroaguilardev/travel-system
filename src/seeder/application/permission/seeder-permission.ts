import { PermissionRepository } from '../../../permissions/domain/permission.repository';
import { CommandPermissionCreate } from '../../../permissions/application/create/command-create-permission';
import { CreatePermissionRequest } from '../../../permissions/application/create/create-permission';

export class PermissionSeeder {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(permissions: CreatePermissionRequest[]): Promise<void> {
    await Promise.all(
      permissions.map((_) =>
        this.permissionRepository.save(CommandPermissionCreate.execute(_)),
      ),
    );
  }
}
