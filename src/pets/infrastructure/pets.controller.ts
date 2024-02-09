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
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @Auth()
  create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.update(id, updatePetDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.remove(id, user);
  }
}
