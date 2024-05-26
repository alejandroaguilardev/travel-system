import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsContractFinishClient() {
  return applyDecorators(
    ApiOperation({
      summary: 'Finalizar un contracto en la vista del cliente',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'El contrato finalizo con éxito',
          },
        },
      },
    }),
  );
}
