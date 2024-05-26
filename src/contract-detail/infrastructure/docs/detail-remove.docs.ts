import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsDetailRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar Detalles',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el detalle exitosamente',
          },
        },
      },
    }),
  );
}
