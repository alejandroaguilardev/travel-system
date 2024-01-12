import { UserRepository } from '../../domain/user.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CriteriaFactory } from '../../../common/application/criteria/criteria.factory';
import { UserResponse } from '../response/user.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { UserWithoutResponse } from '../response/user-without.response';

export class UserFinAll {
  constructor(private userRepository: UserRepository) {}

  async find(
    criteriaRequest: CriteriaRequest,
  ): Promise<ResponseSearch<UserWithoutResponse>> {
    const criteria = CriteriaFactory.fromData(criteriaRequest);

    return await this.userRepository.search<UserResponse>(criteria);
  }
}
