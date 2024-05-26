import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  Put,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { PetChipDto } from './dto/pet-chip.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  DocsPetCreate,
  DocsPetFindAll,
  DocsPetFindOne,
  DocsPetRemove,
  DocsPetUpdate,
} from './docs';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @Auth()
  @DocsPetCreate()
  create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  @Auth()
  @DocsPetFindAll()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  @DocsPetFindOne()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  @DocsPetUpdate()
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.update(id, updatePetDto, user);
  }

  @Patch(':id/chip')
  @Auth()
  updateChip(
    @Param('id') id: string,
    @Body() petChipDto: PetChipDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.updateChip(id, petChipDto, user);
  }

  @Delete(':id')
  @Auth()
  @DocsPetRemove()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.petsService.remove(id, user);
  }
}
