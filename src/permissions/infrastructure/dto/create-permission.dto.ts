import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreatePermissionRequest } from '../../application/create/create-permission';

export class CreatePermissionDto implements CreatePermissionRequest {
  @IsUUID(null, { message: 'Debe enviar un identificador válido' })
  id: string;
  @IsString({ message: 'Debe enviar un nombre válido' })
  name: string;
  @IsOptional()
  @IsString({ message: 'Debe enviar una descripción válido' })
  description: string = '';
  @IsString({ message: 'Debe enviar un grupo válido' })
  group: string;
}
