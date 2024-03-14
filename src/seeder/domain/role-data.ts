import { UUID } from '../../common/application/services/uuid';
import { CreatePermissionRequest } from '../../permissions/application/create/create-permission';
import { AuthGroup } from '../../common/domain/auth-permissions';
import { RoleCreatorRequest } from '../../roles/application/create/role-creator-request';

export const getRolesData = (
  uuid: UUID,
  permissions: CreatePermissionRequest[],
): RoleCreatorRequest[] => [
  {
    id: uuid.generate(),
    name: 'Gestión de usuarios',
    description: 'Gestionar los usuarios del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.ROLES)
        .map((_) => _.id),
      ...permissions
        .filter((_) => _.group === AuthGroup.USERS)
        .map((_) => _.id),
    ],
  },
  {
    id: uuid.generate(),
    name: 'Gestión de Jaulas',
    description: 'Gestionar las jaulas del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.CAGES)
        .map((_) => _.id),
    ],
  },
  {
    id: uuid.generate(),
    name: 'Gestión de Contratos',
    description: 'Gestionar las jaulas del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.CONTRACTS)
        .map((_) => _.id),
    ],
  },
  {
    id: uuid.generate(),
    name: 'Gestión de Mascotas',
    description: 'Gestionar las jaulas del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.CAGES)
        .map((_) => _.id),
    ],
  },
  {
    id: uuid.generate(),
    name: 'Gestión de Clientes',
    description: 'Gestionar las jaulas del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.CLIENT)
        .map((_) => _.id),
    ],
  },
  {
    id: uuid.generate(),
    name: 'Gestión de Expedientes',
    description: 'Gestionar los expedientes del sistemas',
    permissions: [
      ...permissions
        .filter((_) => _.group === AuthGroup.FOLDER)
        .map((_) => _.id),
    ],
  },
];
