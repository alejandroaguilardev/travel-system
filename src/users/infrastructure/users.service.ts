import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { UserMongoRepository } from './persistence/user-mongo.repository';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { UserCreator } from '../application/create/user-creator';
import { UserFinAll } from '../application/find-all/user-find-all';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFind } from '../application/find/user-find';
import { UserUpdater } from '../application/update/user-updater';
import { UserRemover } from '../application/remove/user-remover';
import {
  UserWithoutResponse,
  UserWithoutWithRoleResponse,
} from '../application/response/user-without.response';
import { UserCreatorDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createAuthDto: UserCreatorDto): Promise<ResponseSuccess> {
    const userCreator = new UserCreator(
      this.userMongoRepository,
      this.bcryptService,
    );
    return userCreator.create(createAuthDto);
  }

  async findAll(
    criteriaDto: CriteriaDto,
  ): Promise<ResponseSearch<UserWithoutResponse>> {
    const fillAllUser = new UserFinAll(this.userMongoRepository);
    return fillAllUser.find(criteriaDto);
  }

  findOne(userId: string): Promise<UserWithoutWithRoleResponse> {
    const findUser = new UserFind(this.userMongoRepository);
    return findUser.find(userId);
  }

  update(
    userId: string,
    updateAuthDto: UpdateUserDto,
  ): Promise<ResponseSuccess> {
    const userUpdater = new UserUpdater(this.userMongoRepository);
    return userUpdater.update(userId, updateAuthDto);
  }

  remove(userId: string): Promise<ResponseSuccess> {
    const userRemover = new UserRemover(this.userMongoRepository);
    return userRemover.remove(userId);
  }
}
