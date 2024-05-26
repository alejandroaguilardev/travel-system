import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DocsContractFinish() {
  return applyDecorators(
    ApiOperation({
      summary: 'Finalizar un contracto',
      description: 'Debe haberse completado los servicios',
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
    ApiBadRequestResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            status: 400,
            timestamp: '2024-05-23T08:18:32.236Z',
            path: '/api/contracts/575be9b1-8654-478c-9a5d-7a312515e17e/finish',
            message: 'El contrato no esta completado',
            error: 'invalid_argument',
          },
        },
      },
    }),
  );
}
