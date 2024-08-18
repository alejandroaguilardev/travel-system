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
      description: 'Gestionar los usuarios del sistema',
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
      description: 'Gestionar las jaulas del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CAGES)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Contratos',
      description: 'Gestionar contratos del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACTS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Mascotas',
      description: 'Gestionar las mascotas del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.PETS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Clientes',
      description: 'Gestionar los clientes del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CLIENT)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Expedientes',
      description: 'Gestionar los expedientes del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.FOLDERS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Incidencias',
      description: 'Gestionar los errores del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.INCIDENTS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Documentos',
      description: 'Gestionar los documentos',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_DOCUMENTATION)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Gestión de Topico',
      description: 'Gestionar los examenes de topico',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_TOPICO)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Fase de Jaula',
      description: 'Gestionar las jaulas',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_CAGE)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Fase viaje',
      description: 'Gestionar los Viajes',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_TRAVEL)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Documentación senasa',
      description: 'Gestionar Acciones en senasa',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_SENASA)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: 'Finalizar contrato',
      description: 'Finalizar o cancelar contrato',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_FINISH)
          .map((_) => _.id),
      ],
    },
  ];
