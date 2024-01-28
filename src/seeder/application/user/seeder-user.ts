import { UUID } from '../../../common/application/services/uuid';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserFactory } from '../../../users/domain/user-factory';
import { SeederRoleResponse } from '../response/seeder-role.response';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserResponse } from '../../../users/application/response/user.response';
import { Hashing } from '../../../common/application/services/hashing';
import { UserPassword } from '../../../users/domain/user-password';

export class UserSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
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
      roles: [],
    });

    admin.setPassword(
      new UserPassword(this.hashing.hashPassword(admin.password.value)),
    );
    client.setPassword(
      new UserPassword(this.hashing.hashPassword(client.password.value)),
    );

    await this.isInitProject();

    await Promise.all([
      this.userRepository.save(admin),
      this.userRepository.save(client),
    ]);
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
    const response = await this.userRepository.search<UserResponse>(criteria);
    await Promise.all(
      response.rows.map((r) => this.userRepository.remove(new Uuid(r.id))),
    );
  }
}
