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
import { Auth, GetUser } from '../../auth/infrastructure/decorator';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import {
  DocsRoleCreate,
  DocsRoleFindAOne,
  DocsRoleFindAll,
  DocsRoleRemove,
  DocsRoleUpdate,
} from './docs';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth()
  @DocsRoleCreate()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @Auth()
  @DocsRoleFindAll()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.rolesService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  @DocsRoleFindAOne()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.rolesService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  @DocsRoleUpdate()
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @Auth()
  @DocsRoleRemove()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.rolesService.remove(id, user);
  }
}
