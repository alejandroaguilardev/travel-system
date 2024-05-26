import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsPetRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover una mascota',
      description: 'Elimina una mascota del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  la mascota exitosamente',
          },
        },
      },
    }),
  );
}
