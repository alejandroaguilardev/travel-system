import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsFolderRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover un folder',
      description: 'Elimina un folder del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el expediente exitosamente',
          },
        },
      },
    }),
  );
}
