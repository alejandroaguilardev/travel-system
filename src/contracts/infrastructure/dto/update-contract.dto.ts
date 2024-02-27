import { CreateContractDto } from './create-contract.dto';
import { ContractUpdaterRequest } from '../../../contracts/application/update/contract-updater-request';

export class UpdateContractDto
  extends CreateContractDto
  implements ContractUpdaterRequest {}
