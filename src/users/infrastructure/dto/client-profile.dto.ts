import { IsString } from 'class-validator';
import { UserProfileClient } from '../../application/update/profile-client/update-client-profile';

export class ClientProfileDto implements UserProfileClient {
  @IsString({ message: 'El teléfono no es un formato válido' })
  readonly phone: string;
}
