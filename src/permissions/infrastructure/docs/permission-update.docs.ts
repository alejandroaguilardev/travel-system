import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

export function DocsPermissionUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo permiso',
      description: 'Crear un nuevo permiso en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdatePermissionDto,
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
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se actualizó el permiso exitosamente',
          },
        },
      },
    }),
  );
}
