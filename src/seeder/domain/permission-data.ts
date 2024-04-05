import { UUID } from '../../common/application/services/uuid';
import {
  AuthPermission,
  AuthGroup,
} from '../../common/domain/auth-permissions';
import { CreatePermissionRequest } from '../../permissions/application/create/create-permission';

export const getPermissionsData = (uuid: UUID): CreatePermissionRequest[] => [
  // CAGES
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.CAGES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.CAGES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.CAGES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CAGES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CAGES,
  },

  // CONTRACTS
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.TRAVEL,
    description: 'Editar Requisitos de Viajes',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.CAGE,
    description: 'Editar Jaula de la mascota',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DOCUMENTATION,
    description: 'Editar documentación de la mascota',
    group: AuthGroup.CONTRACTS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.TOPICO,
    description: 'Actualizar Topico',
    group: AuthGroup.CONTRACTS,
  },

  // PETS
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.PETS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.PETS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.PETS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.PETS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.PETS,
  },

  // ROLES
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.ROLES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.ROLES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.ROLES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.ROLES,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.ROLES,
  },

  // FOLDERS
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.FOLDERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.FOLDERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.FOLDERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.FOLDERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.FOLDERS,
  },

  // USERS
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.USERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.USERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.USERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.USERS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.USERS,
  },
];
