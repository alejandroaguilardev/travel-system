import { UUID } from '../../common/application/services/uuid';
import { CreatePermissionRequest } from '../../permissions/application/create/create-permission';
import { AuthGroup, AuthPermission } from '../../common/domain/auth-permissions';
import { RoleCreatorRequest } from '../../roles/application/create/role-creator-request';


export enum RoleNameData {
  USERS = "Gestión de usuarios",
  CAGES = "Gestión de Jaulas",
  CONTRACTS = "Gestión de Contratos",
  PETS = "Gestión de Mascotas",
  CLIENT = "Gestión de Clientes",
  FOLDERS = "Gestión de Expedientes",
  INCIDENTS = "Gestión de Incidencias",
  CONTRACT_DOCUMENTATION = "Gestión de Documentos",
  CONTRACT_TOPICO = "Gestión de Topico",
  CONTRACT_CAGE = "Fase de Jaula",
  CONTRACT_TRAVEL = "Fase viaje",
  CONTRACT_SENASA = "Documentación senasa",
  CONTRACT_FINISH = "Finalizar contrato",
  CONTRACT_HISTORY = "Historial contrato",
}


export const getRolesData = (
  uuid: UUID,
  permissions: CreatePermissionRequest[],
): RoleCreatorRequest[] => [
    {
      id: uuid.generate(),
      name: RoleNameData.USERS,
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
      name: RoleNameData.CAGES,
      description: 'Gestionar las jaulas del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CAGES)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACTS,
      description: 'Gestionar contratos del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACTS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.PETS,
      description: 'Gestionar las mascotas del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.PETS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CLIENT,
      description: 'Gestionar los clientes del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CLIENT)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.FOLDERS,
      description: 'Gestionar los expedientes del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.FOLDERS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.INCIDENTS,
      description: 'Gestionar los errores del sistema',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.INCIDENTS)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_DOCUMENTATION,
      description: 'Gestionar los documentos',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_DOCUMENTATION)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_TOPICO,
      description: 'Gestionar los examenes de topico',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_TOPICO)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_CAGE,
      description: 'Gestionar las jaulas',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_CAGE)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_TRAVEL,
      description: 'Gestionar los Viajes',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_TRAVEL)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_SENASA,
      description: 'Gestionar Acciones en senasa',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_SENASA)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_FINISH,
      description: 'Finalizar o cancelar contrato',
      permissions: [
        ...permissions
          .filter((_) => _.group === AuthGroup.CONTRACT_FINISH)
          .map((_) => _.id),
      ],
    },
    {
      id: uuid.generate(),
      name: RoleNameData.CONTRACT_HISTORY,
      description: 'Historial de contratos',
      permissions: [
        ...permissions
          .filter(_ => {
            if (_.group === AuthGroup.CONTRACTS && AuthPermission.LIST === _.name) {
              return true
            }
            if (_.group === AuthGroup.CONTRACTS && AuthPermission.READ === _.name) {
              return true
            }
            return false;
          })
          .map((_) => _.id),
      ],
    },
  ];
