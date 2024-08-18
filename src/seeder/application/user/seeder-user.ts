import { UUID } from '../../../common/application/services/uuid';
import { UserRepository } from '../../../users/domain/user.repository';
import { Hashing } from '../../../common/application/services/hashing';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { CommandCreatorUser } from '../../../users/application/create/command-create-user';
import { UserAuthAdmin } from '../../../users/domain/value-object/auth/user-auth-admin';
import { RoleInterface } from '../../../roles/domain/interfaces/role.interface';
import { getUserData } from '../../domain/users-data';

export class UserSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: Hashing,
    private readonly uuid: UUID,
  ) { }

  async execute(roles: RoleInterface[]): Promise<void> {
    const users = getUserData(this.uuid);

    await Promise.all(
      users.map((_) => {
        _.roles = _.roles.map(role => {
          const { id } = roles.find(__ => __.name === role);
          if (!id) throw new Error("Error al asignar rol" + role);
          return id;
        })


        const user = CommandCreatorUser.execute(_, '');
        if (_?.auth?.admin) {
          user.auth.setAdmin(new UserAuthAdmin(true));
        }

        user.setPassword(new UserPassword(this.hashing.hashPassword(_.profile.documentNumber)));
        return this.userRepository.save(user);
      }),
    );
  }
}
