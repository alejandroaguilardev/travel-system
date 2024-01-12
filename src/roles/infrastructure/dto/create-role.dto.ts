import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoleCreatorRequest } from '../../application/create/role-creator-request';

export class CreateRoleDto implements RoleCreatorRequest {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  permissions: string[];
}
