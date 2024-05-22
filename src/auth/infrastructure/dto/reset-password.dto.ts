import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'La contraseña debe ser una cadena de texto válida.' })
  readonly password: string;
}
