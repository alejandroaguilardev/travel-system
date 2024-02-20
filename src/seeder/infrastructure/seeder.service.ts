import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
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
import { getPermissionsData } from '../domain/permission-data';
import { getRolesData } from '../domain/role-data';
import { CagesSeeder } from '../application/cages/seeder-cages';
import { MongoCageRepository } from '../../cages/infrastructure/persistence/mongo-cage.repository';

@Injectable()
export class SeederService {
  constructor(
    private readonly mongoPermissionRepository: MongoPermissionRepository,
    private readonly mongoRoleRepository: MongoRoleRepository,
    private readonly userMongoRepository: UserMongoRepository,
    private readonly mongoCageRepository: MongoCageRepository,
    private readonly uuid: UUIDService,
    private readonly bcrypt: BcryptService,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  async seeder(): Promise<ResponseSuccess> {
    const permissionSeeder = new PermissionSeeder(
      this.mongoPermissionRepository,
    );
    const roleSeeder = new RoleSeeder(this.mongoRoleRepository);
    const userSeeder = new UserSeeder(
      this.userMongoRepository,
      this.bcrypt,
      this.uuid,
    );
    const cagesSeeder = new CagesSeeder(this.mongoCageRepository, this.uuid);

    const permissions = getPermissionsData(this.uuid);
    const roles = getRolesData(this.uuid, permissions);

    await this.connection.db.dropDatabase();

    await permissionSeeder.execute(permissions);
    await roleSeeder.execute(roles);
    await userSeeder.execute();
    await cagesSeeder.execute();

    return ResponseMessage.createSuccessResponse('seeder ejecutado');
  }
}
