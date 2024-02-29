import { IsDate, IsOptional, IsString } from 'class-validator';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';

export class ProfileDto implements ProfileInterface {
  @IsString()
  document: string;
  @IsString()
  documentNumber: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  secondName: string;
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  secondLastName: string;
  @IsString()
  phone: string;
  @IsString()
  gender: string;
  @IsOptional()
  @IsDate()
  birthDate: Date;
  @IsOptional()
  @IsString()
  department: string;
  @IsOptional()
  @IsString()
  province: string;
  @IsOptional()
  @IsString()
  district: string;
  @IsString()
  @IsOptional()
  direction: string;
}
