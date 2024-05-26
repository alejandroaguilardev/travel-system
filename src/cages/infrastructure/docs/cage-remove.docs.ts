import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsCageRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover una jaula',
      description: 'Elimina un jaula del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  la jaula exitosamente',
          },
        },
      },
    }),
  );
}
