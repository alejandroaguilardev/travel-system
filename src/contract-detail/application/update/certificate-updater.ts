import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { ContractDocumentation } from '../../domain/value-object/service-documentation';
import { CommandContractDocumentation } from './command/command-documentation';
import { DocumentationInterface } from '../../../contract-detail/domain/interfaces/documentation.interface';

export class ContractDetailCertificateUpdater {
  constructor(private readonly contractRepository: ContractRepository) { }

  async execute(
    contractId: string,
    contractDetailId: string,
    documentationPartial: Partial<ContractDocumentation>,
    value: keyof typeof ContractDocumentation.keysObject,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const ensureContractDetail = new EnsureContractDetail(
      this.contractRepository,
    );
    const { contractResponse, contractDetailResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.DOCUMENTATION,
    );



    const documentationUpdate = CommandContractDocumentation.execute({
      ...(contractDetailResponse?.documentation ?? {}),
      [value]: documentationPartial.toJson(),
    } as DocumentationInterface);

    documentationUpdate.setStatus(
      documentationUpdate.documentationIsApplied(documentationUpdate.toJson()),
    );
    documentationUpdate.setStatusClient(
      documentationUpdate.documentationClientIsApplied(documentationUpdate.toJson()),
    );


    const contractDetail = {
      ...contractDetailResponse,
      documentation: documentationUpdate.toJson(),
    };
    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });

    contract.status.petTravel.statusError(contract.endDate.value);
    contract.establishedStatus();

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }
}
