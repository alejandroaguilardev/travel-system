import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreatorDto } from './dto/create-user.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userCreatorDto: UserCreatorDto) {
    return this.usersService.create(userCreatorDto);
  }

  @Get()
  findAll(@Query() criteriaDto: CriteriaDto) {
    return this.usersService.findAll(criteriaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.usersService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
