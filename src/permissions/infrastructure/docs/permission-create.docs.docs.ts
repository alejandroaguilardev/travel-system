import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePermissionDto } from '../dto/create-permission.dto';

export function DocsPermissionCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo permiso',
      description: 'Crear un nuevo permiso en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreatePermissionDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'crear',
            group: 'permisos',
            description: '',
          },
        },
      },
    }),
    ApiOkResponse({
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el permiso exitosamente',
          },
        },
      },
    }),
  );
}
