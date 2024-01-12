import { UUID } from '../../../common/application/services/uuid';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserFactory } from '../../../users/domain/user-factory';
import { SeederRoleResponse } from '../response/seeder-role.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';

export class UserSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uuid: UUID,
  ) {}

  async execute(roles: SeederRoleResponse): Promise<void> {
    const admin = UserFactory.create({
      id: this.uuid.generate(),
      name: 'Alejandro',
      secondName: '',
      lastName: 'Aguilar',
      secondLastName: '',
      email: 'alex@gmail.com',
      password: '12345678',
      roles: [roles.admin],
    });
    const client = UserFactory.create({
      id: this.uuid.generate(),
      name: 'Pedro',
      secondName: '',
      lastName: 'Jimenez',
      secondLastName: '',
      email: 'pedro@gmail.com',
      password: '12345678',
      roles: [roles.client],
    });

    await Promise.all([
      this.userRepository.save(admin),
      this.userRepository.save(client),
    ]);
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
    const response = await this.userRepository.search(criteria);
    return response.count > 0;
  }
}
