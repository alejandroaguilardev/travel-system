import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsContractRemove() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover un contracto',
      description: 'Elimina un contracto del sistema',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se elimino  el contrato exitosamente',
          },
        },
      },
    }),
  );
}
