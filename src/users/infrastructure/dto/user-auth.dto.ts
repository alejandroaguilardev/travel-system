import { IsBoolean } from 'class-validator';
import { UserAuthInterface } from '../../domain/interfaces/user-auth.interface';

export class UserAuthDto implements UserAuthInterface {
  @IsBoolean({ message: 'El valor de administrador no es válido' })
  readonly admin: boolean;
}
