import { IsDate, IsString } from 'class-validator';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';

export class ProfileDto implements ProfileInterface {
  @IsString()
  document: string;
  @IsString()
  documentNumber: string;
  @IsString()
  name: string;
  @IsString()
  secondName: string;
  @IsString()
  lastName: string;
  @IsString()
  secondLastName: string;
  @IsString()
  phone: string;
  @IsString()
  gender: string;
  @IsDate()
  birthDate: Date;
  @IsString()
  department: string;
  @IsString()
  province: string;
  @IsString()
  district: string;
  @IsString()
  direction: string;
}
