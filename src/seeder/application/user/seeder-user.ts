import { UUID } from '../../../common/application/services/uuid';
import { UserRepository } from '../../../users/domain/user.repository';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { Hashing } from '../../../common/application/services/hashing';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { CommandCreatorUser } from '../../../users/application/create/command-create-user';
import { UserAuthAdmin } from '../../../users/domain/value-object/auth/user-auth-admin';

export class UserSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
    private readonly uuid: UUID,
  ) {}

  async execute(): Promise<void> {
    const admin = CommandCreatorUser.execute(
      {
        id: this.uuid.generate(),
        email: 'alex@gmail.com',
        password: '12345678',
        roles: [],
        profile: {
          name: 'Alejandro',
          secondName: '',
          lastName: 'Aguilar',
          secondLastName: '',
          birthDate: new Date(),
          province: '',
          department: '',
          direction: '',
          district: '',
          gender: 'male',
          phone: '',
        },
        status: '',
        auth: {
          admin: true,
          rememberToken: '',
          lastLogin: null,
        },
      },
      '',
    );
    const client = CommandCreatorUser.execute(
      {
        id: this.uuid.generate(),
        email: 'pedro@gmail.com',
        password: '12345678',
        roles: [],
        profile: {
          name: 'Pedro',
          secondName: '',
          lastName: 'Jimenez',
          secondLastName: '',
          birthDate: new Date(),
          province: '',
          department: '',
          direction: '',
          district: '',
          gender: 'male',
          phone: '',
        },
        status: '',
      },
      '',
    );

    admin.auth.setAdmin(new UserAuthAdmin(true));

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
    const criteria = CommandCriteria.fromData({
      start: 0,
      sorting: [],
      filters: [],
      globalFilter: '',
      globalFilterProperties: [],
      size: 100,
      selectProperties: [],
    });
    const response = await this.userRepository.search<UserResponse>(criteria);
    await Promise.all(
      response.rows.map((r) => this.userRepository.remove(new Uuid(r.id))),
    );
  }
}
