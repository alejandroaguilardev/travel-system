import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreatorDto } from './dto/create-user.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../application/response/user-without.response';

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
  findAll(@Query() criteriaDto: CriteriaDto) {
    return this.usersService.findAll(criteriaDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
