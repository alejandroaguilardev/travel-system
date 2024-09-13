import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractDetailInterface } from './interfaces';
import {
    ContractCage,
    ContractDocumentation,
    ContractTravel,
} from './value-object';
import { ContractTopico } from './value-object/contract-topico';

export class ContractDetailStatusUpdate {

    static statusUpdate(contractDetail: ContractDetailInterface): ContractDetailInterface {
        contractDetail.documentation.status = ContractDocumentation.documentationIsApplied(contractDetail.documentation);
        contractDetail.documentation.clientStatus = ContractDocumentation.documentationIsApplied(contractDetail.documentation);
        contractDetail.topico.status = ContractTopico.topicoIsApplied(contractDetail.topico);
        return contractDetail;
    }
}
