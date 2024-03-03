import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreatorDto } from './dto/create-user.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../domain/interfaces/user-without.response';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ClientProfileDto } from './dto/client-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth()
  create(
    @Body() userCreatorDto: UserCreatorDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.create(userCreatorDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateUserDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.update(id, updateAuthDto, user);
  }

  @Patch('profile')
  @Auth()
  updateProfile(
    @Body() profileDto: ClientProfileDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.updateProfile(profileDto, user);
  }

  @Patch('change-password')
  @Auth()
  updatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.updatePassword(changePasswordDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.usersService.remove(id, user);
  }
}
