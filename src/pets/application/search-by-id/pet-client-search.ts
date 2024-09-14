import { Uuid } from '../../../common/domain/value-object/uuid';
import { PetRepository } from '../../domain/pet.repository';
import { PetsClientResponse } from '../../domain/interfaces/pet.response';
import {
    AuthGroup,
    AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class PetSearchByClient {
    constructor(private readonly petRepository: PetRepository) { }

    async execute(
        idClient: string,
        user: UserWithoutWithRoleResponse,
    ): Promise<PetsClientResponse[]> {
        PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.LIST);
        const uuid = new Uuid(idClient);
        const response = await this.petRepository.searchByClient(uuid);
        return response;
    }
}
