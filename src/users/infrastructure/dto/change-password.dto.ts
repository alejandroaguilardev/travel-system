import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'La contraseña antigua no es un formato válido' })
  readonly password: string;
  @IsString({ message: 'El contraseña nueva no es un formato válido' })
  readonly newPassword: string;
}
