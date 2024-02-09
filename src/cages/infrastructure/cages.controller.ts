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
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { Auth, GetUser } from '../../auth/infrastructure/decorator';
import { CagesService } from './cages.service';
import { CreateCageDto } from './dto/create-cage.dto';
import { UpdateCageDto } from './dto/update-cage.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';

@Controller('cages')
export class CagesController {
  constructor(private readonly cagesService: CagesService) {}

  @Post()
  @Auth()
  create(
    @Body() createCageDto: CreateCageDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.cagesService.create(createCageDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.cagesService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.cagesService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateCageDto: UpdateCageDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.cagesService.update(id, updateCageDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.cagesService.remove(id, user);
  }
}
