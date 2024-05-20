export enum AuthGroup {
  CAGES = 'jaulas',
  CLIENT = 'clientes',
  CONTRACTS = 'contratos',
  CONTRACTS_DETAIL = 'detalles de contratos',
  PERMISSIONS = 'permisos',
  PETS = 'mascotas',
  ROLES = 'roles',
  USERS = 'usuarios',
  FOLDERS = 'expedientes',
  INCIDENTS = 'incidencias',
}

export enum AuthPermission {
  READ = 'leer',
  LIST = 'listar',
  CREATE = 'crear',
  EDIT = 'editar',
  DELETE = 'eliminar',

  FINISH = 'finalizar',
  DOCUMENTATION = 'documentación',
  TOPICO = 'topico',
  CAGE = 'jaula',
  TRAVEL = 'viaje',
}
