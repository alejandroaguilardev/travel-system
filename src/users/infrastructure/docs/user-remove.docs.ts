import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsUserRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover un usuario',
      description: 'Elimina un usuario del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el usuario exitosamente',
          },
        },
      },
    }),
  );
}
