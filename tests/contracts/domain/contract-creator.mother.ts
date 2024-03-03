import { ContractCreateRequest } from '../../../src/contracts/application/create/contract-create-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { DateMother } from '../../common/domain/date.mother';
import { NumberMother } from '../../common/domain/number.mother';
import { ContractInterface } from '../../../src/contracts/domain/interfaces/contract.interface';
import { ContractDetailCreatorMother } from '../../contract-detail/domain/contract-creator.mother';

export class ContractCreatorMother {
  static create(dto?: Partial<ContractCreateRequest>): ContractCreateRequest {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      number: dto?.number ?? NumberMother.create(),
      startDate: dto?.startDate ?? DateMother.recent(),
      details: dto?.details ?? [ContractDetailCreatorMother.create()],
      adviser: dto?.adviser ?? UuidMother.create(),
    };
  }

  static createWithTravel(dto?: Partial<ContractInterface>): ContractInterface {
    return {
      id: dto?.id ?? UuidMother.create(),
      client: dto?.client ?? UuidMother.create(),
      details: dto?.details ?? [UuidMother.create()],
      number: NumberMother.create(),
      startDate: DateMother.recent(),
      endDate: dto?.endDate ?? null,
      status: dto?.status ?? 'in-process',
      adviser: dto?.adviser ?? UuidMother.create(),
      user: dto?.user ?? UuidMother.create(),
    };
  }
}
