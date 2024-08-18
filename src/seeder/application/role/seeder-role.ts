import { RoleRepository } from '../../../roles/domain/role.repository';
import { CommandRole } from '../../../roles/application/create/command-role';
import { RoleCreatorRequest } from '../../../roles/application/create/role-creator-request';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { RoleInterface } from '../../../roles/domain/interfaces/role.interface';
import { ResponseSearch } from '../../../common/domain/response/response-search';

export class RoleSeeder {
  constructor(private readonly roleRepository: RoleRepository) { }

  async execute(roles: RoleCreatorRequest[]): Promise<ResponseSearch<RoleInterface>> {
    await Promise.all(
      roles.map((_) => this.roleRepository.save(CommandRole.execute(_))),
    );

    const criteria = CommandCriteria.fromData({
      start: 0,
      size: 1000,
      filters: [],
      globalFilter: "",
      globalFilterProperties: [],
      selectProperties: [],
      sorting: []
    });

    return await this.roleRepository.search<RoleInterface>(criteria);
  }

}
