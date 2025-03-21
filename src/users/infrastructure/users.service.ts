import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { UserMongoRepository } from './persistence/user-mongo.repository';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { UserCreator } from '../application/create/user-creator';
import { UserSearch } from '../application/search/user-search';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSearchById } from '../application/search-by-id/user-search-by-id';
import { UserUpdater } from '../application/update/user-updater';
import { UserRemover } from '../application/remove/user-remover';
import {
  UserWithoutResponse,
  UserWithoutWithRoleResponse,
} from '../domain/interfaces/user-without.response';
import { UserCreatorDto } from './dto/create-user.dto';
import { CommandCreatorUser } from '../application/create/command-create-user';
import { UserPassword } from '../domain/value-object/user-password';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserProfileUpdater } from '../application/update/profile-client/user-profile-updater';
import { UserChangePasswordUpdater } from '../application/update/user-change-password';
import { ClientProfileDto } from './dto/client-profile.dto';
import { CredentialsNotification } from '../../auth/application/notification/credentials-notification';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';

@Injectable()
export class UsersService {
  private isProductionMode: string;
  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly bcryptService: BcryptService,
    private readonly adapterApi: LaravelApiAdapter,
  ) {
    this.isProductionMode = process.env.PRODUCTION;
  }

  async create(
    createAuthDto: UserCreatorDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const userCreator = new UserCreator(
      this.userMongoRepository,
      this.bcryptService,
    );
    const userCommand = CommandCreatorUser.execute(createAuthDto, user.id);

    const password = new UserPassword(userCommand.profile.documentNumber.value);

    const response = await userCreator.create(userCommand, password, user);
    const mail = new CredentialsNotification(this.adapterApi);
    mail.execute(
      userCommand.email,
      userCommand.profile.document,
      userCommand.profile.documentNumber,
      password,
    );
    return response;
  }

  async findAll(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<UserWithoutResponse>> {
    const fillAllUser = new UserSearch(this.userMongoRepository);
    return fillAllUser.execute(criteriaDto, user);
  }

  findOne(
    userId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<UserWithoutWithRoleResponse> {
    const findUser = new UserSearchById(this.userMongoRepository);
    return findUser.execute(userId, user);
  }

  update(
    userId: string,
    updateAuthDto: UpdateUserDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const userUpdater = new UserUpdater(this.userMongoRepository);
    const userCommand = CommandCreatorUser.execute(updateAuthDto, user.id);
    return userUpdater.update(userId, userCommand, user);
  }

  updateProfile(
    clientProfileDto: ClientProfileDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const userUpdater = new UserProfileUpdater(this.userMongoRepository);
    return userUpdater.execute(clientProfileDto, user);
  }

  updatePassword(
    changePasswordDto: ChangePasswordDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const userChangePasswordUpdater = new UserChangePasswordUpdater(
      this.userMongoRepository,
      this.bcryptService,
    );
    const password = new UserPassword(changePasswordDto.password);
    const newPassword = new UserPassword(changePasswordDto.newPassword);
    return userChangePasswordUpdater.execute(password, newPassword, user);
  }

  remove(
    userId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const userRemover = new UserRemover(this.userMongoRepository);
    return userRemover.remove(userId, user);
  }
}
