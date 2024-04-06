import { Uuid, UuidOptional } from '../../../common/domain/value-object';
import { ContractDetail } from '../../domain/contract-detail';
import { ContractGuideNumber } from '../../domain/value-object';
import { ContractDetailCreateRequest } from './contract-detail-create-request';
import {
  CommandContractCage,
  CommandContractDocumentation,
  CommandContractTravel,
} from '../update';
import { CommandContractTopico } from '../update/command/topico-command';

export class CommandContractDetailCreator {
  static execute(
    data: ContractDetailCreateRequest[],
    userId: string,
  ): ContractDetail[] {
    return data.map((detail) =>
      CommandContractDetailCreator.detail(detail, userId),
    );
  }

  static detail(
    data: ContractDetailCreateRequest,
    userId: string,
  ): ContractDetail {
    return new ContractDetail(
      new Uuid(data.id),
      CommandContractDocumentation.execute(data.documentation),
      CommandContractCage.execute(data.cage),
      CommandContractTravel.execute(data.travel),
      new ContractGuideNumber(data.guideNumber),
      new UuidOptional(data?.pet ?? ''),
      new UuidOptional(userId),
      CommandContractTopico.execute(data?.topico),
    );
  }
}
