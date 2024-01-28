import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreatePermission } from '../../application/create/create-permission';

export class CreatePermissionDto implements CreatePermission {
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
