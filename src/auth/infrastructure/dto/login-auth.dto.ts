import { IsString } from 'class-validator';
import { LoginUserRequest } from '../../application/login/login-user-request';

export class LoginAuthDto implements LoginUserRequest {
  @IsString({ message: 'El documento debe ser una cadena de texto válida.' })
  readonly document: string;
  @IsString({
    message: 'El número de documento debe ser una cadena de texto válida.',
  })
  readonly documentNumber: string;
  @IsString({ message: 'La contraseña debe ser una cadena de texto válida.' })
  readonly password: string;
}
