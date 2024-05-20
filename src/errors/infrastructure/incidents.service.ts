import { Injectable } from '@nestjs/common';
import { MongoIncidentRepository } from './persistence/mongo-incident.repository';
import { CreateIncident } from '../application/create/create-incidents';
import { CommandCreateIncident } from '../application/create/command-create-indicent';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { IncidentSearch } from '../application/search/incident-search';
import { CommandCriteria } from '../../common/application/criteria/command-criteria';
import { IncidentSearchById } from '../application/search-by-id/incident-search-by-id';
import { Uuid } from '../../common/domain/value-object/uuid';
import { IncidentNotificationSearchById } from '../application/search-by-id/incident-not-search-by-id';
import { IncidentNotificationSearch } from '../application/search/incident-notification-search';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { IncidentDto } from './dto/incident.dto';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly mongoIncidentRepository: MongoIncidentRepository,
    private readonly laravelApi: LaravelApiAdapter,
  ) {}

  create(dto: IncidentDto) {
    const createIncident = new CreateIncident(this.mongoIncidentRepository);
    const incident = CommandCreateIncident.execute(dto);
    return createIncident.execute(incident);
  }

  getRecords(criteriaDto: CriteriaDto, user: UserWithoutWithRoleResponse) {
    const search = new IncidentSearch(this.mongoIncidentRepository);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return search.execute(criteria, user);
  }

  getRecord(id: string, user: UserWithoutWithRoleResponse) {
    const search = new IncidentSearchById(this.mongoIncidentRepository);
    return search.execute(new Uuid(id), user);
  }

  getNotificationRecords(
    criteriaDto: CriteriaDto,
    user: UserWithoutWithRoleResponse,
  ) {
    const search = new IncidentNotificationSearch(this.laravelApi);
    const criteria = CommandCriteria.fromData(criteriaDto);
    return search.execute(criteria, user);
  }

  getNotificationRecord(id: string, user: UserWithoutWithRoleResponse) {
    const search = new IncidentNotificationSearchById(this.laravelApi);
    return search.execute(new Uuid(id), user);
  }
}
