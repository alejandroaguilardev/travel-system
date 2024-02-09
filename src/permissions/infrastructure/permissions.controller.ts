import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { Auth, GetUser } from '../../auth/infrastructure/decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Auth()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteria: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.permissionsService.findAll(criteria, user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.permissionsService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.permissionsService.remove(id, user);
  }
}
