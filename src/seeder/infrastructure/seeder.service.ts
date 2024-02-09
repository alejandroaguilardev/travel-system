import { Injectable } from '@nestjs/common';
import { UserSeeder } from '../application/user/seeder-user';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { UUIDService } from '../../common/infrastructure/services/uuid.service';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { MongoPermissionRepository } from '../../permissions/infrastructure/persistence/mongo-permission.repository';
import { MongoRoleRepository } from '../../roles/infrastructure/persistence/mongo-role.repository';
import { RoleSeeder } from '../application/role/seeder-role';
import { PermissionSeeder } from '../application/permission/seeder-permission';
import { ResponseMessage } from '../../common/domain/response/response-message';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly mongoPermissionRepository: MongoPermissionRepository,
    private readonly mongoRoleRepository: MongoRoleRepository,
    private readonly userMongoRepository: UserMongoRepository,
    private readonly uuid: UUIDService,
    private readonly bcrypt: BcryptService,
  ) {}

  async seeder(): Promise<ResponseSuccess> {
    const permissionSeeder = new PermissionSeeder(
      this.mongoPermissionRepository,
      this.uuid,
    );
    const roleSeeder = new RoleSeeder(this.mongoRoleRepository, this.uuid);
    const userSeeder = new UserSeeder(
      this.userMongoRepository,
      this.bcrypt,
      this.uuid,
    );

    const permissions = await permissionSeeder.execute();
    await roleSeeder.execute(permissions);
    await userSeeder.execute();
    return ResponseMessage.createSuccessResponse('seeder ejecutado');
  }
}
