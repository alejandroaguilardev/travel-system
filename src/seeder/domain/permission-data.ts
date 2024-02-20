import { UUID } from '../../common/application/services/uuid';
import {
  AuthPermission,
  AuthGroup,
} from '../../common/domain/auth-permissions';
import { CreatePermissionRequest } from 'src/permissions/application/create/create-permission';

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

  // CONTRACTS_DETAIL
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.CONTRACTS_DETAIL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.CONTRACTS_DETAIL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.CONTRACTS_DETAIL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACTS_DETAIL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACTS_DETAIL,
  },

  // PERMISSIONS
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.PERMISSIONS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.PERMISSIONS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.PERMISSIONS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.PERMISSIONS,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.PERMISSIONS,
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
