import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsRoleRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover un rol',
      description: 'Elimina un rol del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el rol exitosamente',
          },
        },
      },
    }),
  );
}
