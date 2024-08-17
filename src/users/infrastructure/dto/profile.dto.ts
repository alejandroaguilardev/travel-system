import { IsDate, IsOptional, IsString } from 'class-validator';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';

export class ProfileDto implements ProfileInterface {
  @IsString({ message: 'El documento no es un valor válido' })
  readonly document: string;
  @IsString({ message: 'El número de documento no es un valor válido' })
  readonly documentNumber: string;
  @IsString({ message: 'El nombre  no es un valor válido' })
  readonly name: string;
  @IsOptional()
  @IsString({ message: 'El segundo nombre no es un valor válido' })
  readonly secondName: string;
  @IsString({ message: 'El apellido no es un valor válido' })
  readonly lastName: string;
  @IsOptional()
  @IsString({ message: 'El segundo apellido no es un valor válido' })
  readonly secondLastName: string;
  @IsString({ message: 'El teléfono no es un valor válido' })
  readonly phone: string;
  @IsString({ message: 'El genero no es un valor válido' })
  readonly gender: string;
  @IsOptional()
  @IsDate({ message: 'La fecha de nacimiento' })
  readonly birthDate: Date;
  @IsOptional()
  @IsString({ message: 'El departamento no es un valor válido' })
  readonly department: string;
  @IsOptional()
  @IsString({ message: 'La provincia no es un valor válido' })
  readonly province: string;
  @IsOptional()
  @IsString({ message: 'El distrito no es un valor válido' })
  readonly district: string;
  @IsString({ message: 'La dirección no es un valor válido' })
  @IsOptional()
  readonly direction: string;
  @IsOptional()
  @IsString({ message: 'El cargo no es un valor válido' })
  readonly job: string;
}
