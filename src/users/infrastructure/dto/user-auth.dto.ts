import { IsBoolean, IsOptional } from 'class-validator';
import { UserAuthInterface } from '../../domain/interfaces/user-auth.interface';

export class UserAuthDto implements UserAuthInterface {
  @IsOptional()
  @IsBoolean({ message: 'El valor de administrador no es válido' })
  readonly admin: boolean;
  @IsOptional()
  @IsBoolean({ message: 'El valor de usuario no es válido' })
  readonly user: boolean;
}
