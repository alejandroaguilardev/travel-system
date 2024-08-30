import { CreateRequestIncident } from "../application/create/create-request-incidennt";
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { IncidentRequest } from "../application/response/incident-response";
import { CriteriaRequest } from '../../common/application/criteria/criteria';

export interface IncidentServiceInterface {
    create(dto: CreateRequestIncident): void;
    getRecords(criteriaDto: CriteriaRequest, user: UserWithoutWithRoleResponse): Promise<ResponseSearch<IncidentRequest>>;
    getRecord(id: string, user: UserWithoutWithRoleResponse): Promise<IncidentRequest>;
    getNotificationRecords(criteriaDto: CriteriaRequest, user: UserWithoutWithRoleResponse): Promise<ResponseSearch<IncidentRequest>>;
    getNotificationRecord(id: string, user: UserWithoutWithRoleResponse): Promise<IncidentRequest>;

}