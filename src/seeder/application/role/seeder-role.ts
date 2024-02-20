import { RoleRepository } from '../../../roles/domain/role.repository';
import { CommandRole } from '../../../roles/application/create/command-role';
import { RoleCreatorRequest } from '../../../roles/application/create/role-creator-request';

export class RoleSeeder {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roles: RoleCreatorRequest[]): Promise<void> {
    await Promise.all(
      roles.map((_) => this.roleRepository.save(CommandRole.execute(_))),
    );
  }
}
