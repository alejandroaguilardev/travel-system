import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { Auth, GetUser } from '../../auth/infrastructure/decorator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import {
  DocsFolderCreate,
  DocsFolderFindAll,
  DocsFolderFindOne,
  DocsFolderRemove,
  DocsFolderUpdate,
} from './docs';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @Auth()
  @DocsFolderCreate()
  create(
    @Body() createFolderDto: CreateFolderDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.foldersService.create(createFolderDto, user);
  }

  @Get()
  @Auth()
  @DocsFolderFindAll()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.foldersService.findAll(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  @DocsFolderFindOne()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.foldersService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  @DocsFolderUpdate()
  update(
    @Param('id') id: string,
    @Body() updateFoldersDto: UpdateFolderDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.foldersService.update(id, updateFoldersDto, user);
  }

  @Delete(':id')
  @Auth()
  @DocsFolderRemove()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.foldersService.remove(id, user);
  }
}
