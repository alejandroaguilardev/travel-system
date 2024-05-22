import { IsEmail } from 'class-validator';

export class RecoverDto {
  @IsEmail(undefined, { message: 'El email debe ser un email válido.' })
  readonly email: string;
}
