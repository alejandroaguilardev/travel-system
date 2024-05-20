import { Controller, Get, Param, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { Auth } from '../../auth/infrastructure/decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get('/')
  @Auth()
  getRecords(
    @Query() criteria: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.incidentsService.getRecords(criteria, user);
  }

  @Get('/notification')
  @Auth()
  getNotificationRecords(
    @Query() criteria: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.incidentsService.getNotificationRecords(criteria, user);
  }

  @Get('/notification/:id')
  @Auth()
  getNotificationRecord(
    @Param('id') id,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.incidentsService.getNotificationRecord(id, user);
  }

  @Get('/:id')
  @Auth()
  getRecord(@Param('id') id, @GetUser() user: UserWithoutWithRoleResponse) {
    return this.incidentsService.getRecord(id, user);
  }
}
