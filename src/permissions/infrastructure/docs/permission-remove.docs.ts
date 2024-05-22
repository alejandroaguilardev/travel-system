import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsPermissionRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover un permiso',
      description: 'Elimina un permiso del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el permiso exitosamente',
          },
        },
      },
    }),
  );
}
