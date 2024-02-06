import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserWithoutWithRoleResponse } from '../../users/application/response/user-without.response';
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
  findAll(@Query() criteriaDto: CriteriaDto) {
    return this.cagesService.findAll(criteriaDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.cagesService.findOne(id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.cagesService.remove(id);
  }
}
