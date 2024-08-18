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
  //TOPICO
  {
    id: uuid.generate(),
    name: AuthPermission.EXECUTE,
    description: 'Ingresar Datos',
    group: AuthGroup.CONTRACT_TOPICO,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACT_TOPICO,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_TOPICO,
  },
  //Documentation
  {
    id: uuid.generate(),
    name: AuthPermission.EXECUTE,
    description: 'Ingresar Datos',
    group: AuthGroup.CONTRACT_DOCUMENTATION,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACT_DOCUMENTATION,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_DOCUMENTATION,
  },
  //FINISH
  {
    id: uuid.generate(),
    name: AuthPermission.EXECUTE,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACT_FINISH,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Cancelar Contrato',
    group: AuthGroup.CONTRACT_FINISH,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_FINISH,
  },
  //SENASA
  {
    id: uuid.generate(),
    name: AuthPermission.EXECUTE,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACT_SENASA,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_SENASA,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_SENASA,
  },
  //TRAVEL
  {
    id: uuid.generate(),
    name: AuthPermission.EXECUTE,
    description: 'Ingresar Datos',
    group: AuthGroup.CONTRACT_TRAVEL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CONTRACT_TRAVEL,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CONTRACT_TRAVEL,
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
  // CLIENT
  {
    id: uuid.generate(),
    name: AuthPermission.CREATE,
    description: 'Crear nuevos elementos',
    group: AuthGroup.CLIENT,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.EDIT,
    description: 'Editar elementos existentes',
    group: AuthGroup.CLIENT,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.DELETE,
    description: 'Eliminar elementos existentes',
    group: AuthGroup.CLIENT,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.READ,
    description: 'Leer detalles de elementos',
    group: AuthGroup.CLIENT,
  },
  {
    id: uuid.generate(),
    name: AuthPermission.LIST,
    description: 'Listar elementos',
    group: AuthGroup.CLIENT,
  },
];
