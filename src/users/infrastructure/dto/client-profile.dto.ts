import { IsString } from 'class-validator';
import { UserProfileClient } from '../../application/update/profile-client/update-client-profile';

export class ClientProfileDto implements UserProfileClient {
  @IsString()
  phone: string;
}
